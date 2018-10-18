package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;

import com.mycompany.myapp.domain.CountryLocation;
import com.mycompany.myapp.repository.CountryLocationRepository;
import com.mycompany.myapp.service.CountryLocationService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CountryLocationResource REST controller.
 *
 * @see CountryLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class CountryLocationResourceIntTest {

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private CountryLocationRepository countryLocationRepository;
    
    @Autowired
    private CountryLocationService countryLocationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCountryLocationMockMvc;

    private CountryLocation countryLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CountryLocationResource countryLocationResource = new CountryLocationResource(countryLocationService);
        this.restCountryLocationMockMvc = MockMvcBuilders.standaloneSetup(countryLocationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CountryLocation createEntity(EntityManager em) {
        CountryLocation countryLocation = new CountryLocation()
            .countryCode(DEFAULT_COUNTRY_CODE)
            .content(DEFAULT_CONTENT);
        return countryLocation;
    }

    @Before
    public void initTest() {
        countryLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createCountryLocation() throws Exception {
        int databaseSizeBeforeCreate = countryLocationRepository.findAll().size();

        // Create the CountryLocation
        restCountryLocationMockMvc.perform(post("/api/country-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countryLocation)))
            .andExpect(status().isCreated());

        // Validate the CountryLocation in the database
        List<CountryLocation> countryLocationList = countryLocationRepository.findAll();
        assertThat(countryLocationList).hasSize(databaseSizeBeforeCreate + 1);
        CountryLocation testCountryLocation = countryLocationList.get(countryLocationList.size() - 1);
        assertThat(testCountryLocation.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
        assertThat(testCountryLocation.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createCountryLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = countryLocationRepository.findAll().size();

        // Create the CountryLocation with an existing ID
        countryLocation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCountryLocationMockMvc.perform(post("/api/country-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countryLocation)))
            .andExpect(status().isBadRequest());

        // Validate the CountryLocation in the database
        List<CountryLocation> countryLocationList = countryLocationRepository.findAll();
        assertThat(countryLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCountryLocations() throws Exception {
        // Initialize the database
        countryLocationRepository.saveAndFlush(countryLocation);

        // Get all the countryLocationList
        restCountryLocationMockMvc.perform(get("/api/country-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(countryLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getCountryLocation() throws Exception {
        // Initialize the database
        countryLocationRepository.saveAndFlush(countryLocation);

        // Get the countryLocation
        restCountryLocationMockMvc.perform(get("/api/country-locations/{id}", countryLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(countryLocation.getId().intValue()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCountryLocation() throws Exception {
        // Get the countryLocation
        restCountryLocationMockMvc.perform(get("/api/country-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCountryLocation() throws Exception {
        // Initialize the database
        countryLocationService.save(countryLocation);

        int databaseSizeBeforeUpdate = countryLocationRepository.findAll().size();

        // Update the countryLocation
        CountryLocation updatedCountryLocation = countryLocationRepository.findById(countryLocation.getId()).get();
        // Disconnect from session so that the updates on updatedCountryLocation are not directly saved in db
        em.detach(updatedCountryLocation);
        updatedCountryLocation
            .countryCode(UPDATED_COUNTRY_CODE)
            .content(UPDATED_CONTENT);

        restCountryLocationMockMvc.perform(put("/api/country-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCountryLocation)))
            .andExpect(status().isOk());

        // Validate the CountryLocation in the database
        List<CountryLocation> countryLocationList = countryLocationRepository.findAll();
        assertThat(countryLocationList).hasSize(databaseSizeBeforeUpdate);
        CountryLocation testCountryLocation = countryLocationList.get(countryLocationList.size() - 1);
        assertThat(testCountryLocation.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
        assertThat(testCountryLocation.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCountryLocation() throws Exception {
        int databaseSizeBeforeUpdate = countryLocationRepository.findAll().size();

        // Create the CountryLocation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCountryLocationMockMvc.perform(put("/api/country-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countryLocation)))
            .andExpect(status().isBadRequest());

        // Validate the CountryLocation in the database
        List<CountryLocation> countryLocationList = countryLocationRepository.findAll();
        assertThat(countryLocationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCountryLocation() throws Exception {
        // Initialize the database
        countryLocationService.save(countryLocation);

        int databaseSizeBeforeDelete = countryLocationRepository.findAll().size();

        // Get the countryLocation
        restCountryLocationMockMvc.perform(delete("/api/country-locations/{id}", countryLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CountryLocation> countryLocationList = countryLocationRepository.findAll();
        assertThat(countryLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CountryLocation.class);
        CountryLocation countryLocation1 = new CountryLocation();
        countryLocation1.setId(1L);
        CountryLocation countryLocation2 = new CountryLocation();
        countryLocation2.setId(countryLocation1.getId());
        assertThat(countryLocation1).isEqualTo(countryLocation2);
        countryLocation2.setId(2L);
        assertThat(countryLocation1).isNotEqualTo(countryLocation2);
        countryLocation1.setId(null);
        assertThat(countryLocation1).isNotEqualTo(countryLocation2);
    }
}
