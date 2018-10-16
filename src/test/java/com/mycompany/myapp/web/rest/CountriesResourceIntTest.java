package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;

import com.mycompany.myapp.domain.Countries;
import com.mycompany.myapp.repository.CountriesRepository;
import com.mycompany.myapp.service.CountriesService;
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
 * Test class for the CountriesResource REST controller.
 *
 * @see CountriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class CountriesResourceIntTest {

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    @Autowired
    private CountriesRepository countriesRepository;
    
    @Autowired
    private CountriesService countriesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCountriesMockMvc;

    private Countries countries;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CountriesResource countriesResource = new CountriesResource(countriesService);
        this.restCountriesMockMvc = MockMvcBuilders.standaloneSetup(countriesResource)
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
    public static Countries createEntity(EntityManager em) {
        Countries countries = new Countries()
            .countryCode(DEFAULT_COUNTRY_CODE);
        return countries;
    }

    @Before
    public void initTest() {
        countries = createEntity(em);
    }

    @Test
    @Transactional
    public void createCountries() throws Exception {
        int databaseSizeBeforeCreate = countriesRepository.findAll().size();

        // Create the Countries
        restCountriesMockMvc.perform(post("/api/countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countries)))
            .andExpect(status().isCreated());

        // Validate the Countries in the database
        List<Countries> countriesList = countriesRepository.findAll();
        assertThat(countriesList).hasSize(databaseSizeBeforeCreate + 1);
        Countries testCountries = countriesList.get(countriesList.size() - 1);
        assertThat(testCountries.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
    }

    @Test
    @Transactional
    public void createCountriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = countriesRepository.findAll().size();

        // Create the Countries with an existing ID
        countries.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCountriesMockMvc.perform(post("/api/countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countries)))
            .andExpect(status().isBadRequest());

        // Validate the Countries in the database
        List<Countries> countriesList = countriesRepository.findAll();
        assertThat(countriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCountries() throws Exception {
        // Initialize the database
        countriesRepository.saveAndFlush(countries);

        // Get all the countriesList
        restCountriesMockMvc.perform(get("/api/countries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(countries.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getCountries() throws Exception {
        // Initialize the database
        countriesRepository.saveAndFlush(countries);

        // Get the countries
        restCountriesMockMvc.perform(get("/api/countries/{id}", countries.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(countries.getId().intValue()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCountries() throws Exception {
        // Get the countries
        restCountriesMockMvc.perform(get("/api/countries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCountries() throws Exception {
        // Initialize the database
        countriesService.save(countries);

        int databaseSizeBeforeUpdate = countriesRepository.findAll().size();

        // Update the countries
        Countries updatedCountries = countriesRepository.findById(countries.getId()).get();
        // Disconnect from session so that the updates on updatedCountries are not directly saved in db
        em.detach(updatedCountries);
        updatedCountries
            .countryCode(UPDATED_COUNTRY_CODE);

        restCountriesMockMvc.perform(put("/api/countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCountries)))
            .andExpect(status().isOk());

        // Validate the Countries in the database
        List<Countries> countriesList = countriesRepository.findAll();
        assertThat(countriesList).hasSize(databaseSizeBeforeUpdate);
        Countries testCountries = countriesList.get(countriesList.size() - 1);
        assertThat(testCountries.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingCountries() throws Exception {
        int databaseSizeBeforeUpdate = countriesRepository.findAll().size();

        // Create the Countries

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCountriesMockMvc.perform(put("/api/countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countries)))
            .andExpect(status().isBadRequest());

        // Validate the Countries in the database
        List<Countries> countriesList = countriesRepository.findAll();
        assertThat(countriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCountries() throws Exception {
        // Initialize the database
        countriesService.save(countries);

        int databaseSizeBeforeDelete = countriesRepository.findAll().size();

        // Get the countries
        restCountriesMockMvc.perform(delete("/api/countries/{id}", countries.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Countries> countriesList = countriesRepository.findAll();
        assertThat(countriesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Countries.class);
        Countries countries1 = new Countries();
        countries1.setId(1L);
        Countries countries2 = new Countries();
        countries2.setId(countries1.getId());
        assertThat(countries1).isEqualTo(countries2);
        countries2.setId(2L);
        assertThat(countries1).isNotEqualTo(countries2);
        countries1.setId(null);
        assertThat(countries1).isNotEqualTo(countries2);
    }
}
