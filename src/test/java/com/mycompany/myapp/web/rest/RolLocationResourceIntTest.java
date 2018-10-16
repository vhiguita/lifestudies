package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;

import com.mycompany.myapp.domain.RolLocation;
import com.mycompany.myapp.repository.RolLocationRepository;
import com.mycompany.myapp.service.RolLocationService;
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
 * Test class for the RolLocationResource REST controller.
 *
 * @see RolLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class RolLocationResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private RolLocationRepository rolLocationRepository;
    
    @Autowired
    private RolLocationService rolLocationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRolLocationMockMvc;

    private RolLocation rolLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolLocationResource rolLocationResource = new RolLocationResource(rolLocationService);
        this.restRolLocationMockMvc = MockMvcBuilders.standaloneSetup(rolLocationResource)
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
    public static RolLocation createEntity(EntityManager em) {
        RolLocation rolLocation = new RolLocation()
            .content(DEFAULT_CONTENT);
        return rolLocation;
    }

    @Before
    public void initTest() {
        rolLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createRolLocation() throws Exception {
        int databaseSizeBeforeCreate = rolLocationRepository.findAll().size();

        // Create the RolLocation
        restRolLocationMockMvc.perform(post("/api/rol-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolLocation)))
            .andExpect(status().isCreated());

        // Validate the RolLocation in the database
        List<RolLocation> rolLocationList = rolLocationRepository.findAll();
        assertThat(rolLocationList).hasSize(databaseSizeBeforeCreate + 1);
        RolLocation testRolLocation = rolLocationList.get(rolLocationList.size() - 1);
        assertThat(testRolLocation.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createRolLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolLocationRepository.findAll().size();

        // Create the RolLocation with an existing ID
        rolLocation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolLocationMockMvc.perform(post("/api/rol-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolLocation)))
            .andExpect(status().isBadRequest());

        // Validate the RolLocation in the database
        List<RolLocation> rolLocationList = rolLocationRepository.findAll();
        assertThat(rolLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRolLocations() throws Exception {
        // Initialize the database
        rolLocationRepository.saveAndFlush(rolLocation);

        // Get all the rolLocationList
        restRolLocationMockMvc.perform(get("/api/rol-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getRolLocation() throws Exception {
        // Initialize the database
        rolLocationRepository.saveAndFlush(rolLocation);

        // Get the rolLocation
        restRolLocationMockMvc.perform(get("/api/rol-locations/{id}", rolLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rolLocation.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRolLocation() throws Exception {
        // Get the rolLocation
        restRolLocationMockMvc.perform(get("/api/rol-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRolLocation() throws Exception {
        // Initialize the database
        rolLocationService.save(rolLocation);

        int databaseSizeBeforeUpdate = rolLocationRepository.findAll().size();

        // Update the rolLocation
        RolLocation updatedRolLocation = rolLocationRepository.findById(rolLocation.getId()).get();
        // Disconnect from session so that the updates on updatedRolLocation are not directly saved in db
        em.detach(updatedRolLocation);
        updatedRolLocation
            .content(UPDATED_CONTENT);

        restRolLocationMockMvc.perform(put("/api/rol-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRolLocation)))
            .andExpect(status().isOk());

        // Validate the RolLocation in the database
        List<RolLocation> rolLocationList = rolLocationRepository.findAll();
        assertThat(rolLocationList).hasSize(databaseSizeBeforeUpdate);
        RolLocation testRolLocation = rolLocationList.get(rolLocationList.size() - 1);
        assertThat(testRolLocation.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingRolLocation() throws Exception {
        int databaseSizeBeforeUpdate = rolLocationRepository.findAll().size();

        // Create the RolLocation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolLocationMockMvc.perform(put("/api/rol-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolLocation)))
            .andExpect(status().isBadRequest());

        // Validate the RolLocation in the database
        List<RolLocation> rolLocationList = rolLocationRepository.findAll();
        assertThat(rolLocationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRolLocation() throws Exception {
        // Initialize the database
        rolLocationService.save(rolLocation);

        int databaseSizeBeforeDelete = rolLocationRepository.findAll().size();

        // Get the rolLocation
        restRolLocationMockMvc.perform(delete("/api/rol-locations/{id}", rolLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RolLocation> rolLocationList = rolLocationRepository.findAll();
        assertThat(rolLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolLocation.class);
        RolLocation rolLocation1 = new RolLocation();
        rolLocation1.setId(1L);
        RolLocation rolLocation2 = new RolLocation();
        rolLocation2.setId(rolLocation1.getId());
        assertThat(rolLocation1).isEqualTo(rolLocation2);
        rolLocation2.setId(2L);
        assertThat(rolLocation1).isNotEqualTo(rolLocation2);
        rolLocation1.setId(null);
        assertThat(rolLocation1).isNotEqualTo(rolLocation2);
    }
}
