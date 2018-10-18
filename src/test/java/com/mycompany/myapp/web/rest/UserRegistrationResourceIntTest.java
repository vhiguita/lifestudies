package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;

import com.mycompany.myapp.domain.UserRegistration;
import com.mycompany.myapp.repository.UserRegistrationRepository;
import com.mycompany.myapp.service.UserRegistrationService;
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
 * Test class for the UserRegistrationResource REST controller.
 *
 * @see UserRegistrationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class UserRegistrationResourceIntTest {

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_CITIZENSHIP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CITIZENSHIP_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SECOND_CITIZENSHIP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SECOND_CITIZENSHIP_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SECOND_CITIZENSHIP = false;
    private static final Boolean UPDATED_SECOND_CITIZENSHIP = true;

    @Autowired
    private UserRegistrationRepository userRegistrationRepository;
    
    @Autowired
    private UserRegistrationService userRegistrationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserRegistrationMockMvc;

    private UserRegistration userRegistration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRegistrationResource userRegistrationResource = new UserRegistrationResource(userRegistrationService);
        this.restUserRegistrationMockMvc = MockMvcBuilders.standaloneSetup(userRegistrationResource)
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
    public static UserRegistration createEntity(EntityManager em) {
        UserRegistration userRegistration = new UserRegistration()
            .userName(DEFAULT_USER_NAME)
            .countryCode(DEFAULT_COUNTRY_CODE)
            .city(DEFAULT_CITY)
            .citizenshipCode(DEFAULT_CITIZENSHIP_CODE)
            .secondCitizenshipCode(DEFAULT_SECOND_CITIZENSHIP_CODE)
            .secondCitizenship(DEFAULT_SECOND_CITIZENSHIP);
        return userRegistration;
    }

    @Before
    public void initTest() {
        userRegistration = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRegistration() throws Exception {
        int databaseSizeBeforeCreate = userRegistrationRepository.findAll().size();

        // Create the UserRegistration
        restUserRegistrationMockMvc.perform(post("/api/user-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRegistration)))
            .andExpect(status().isCreated());

        // Validate the UserRegistration in the database
        List<UserRegistration> userRegistrationList = userRegistrationRepository.findAll();
        assertThat(userRegistrationList).hasSize(databaseSizeBeforeCreate + 1);
        UserRegistration testUserRegistration = userRegistrationList.get(userRegistrationList.size() - 1);
        assertThat(testUserRegistration.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testUserRegistration.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
        assertThat(testUserRegistration.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testUserRegistration.getCitizenshipCode()).isEqualTo(DEFAULT_CITIZENSHIP_CODE);
        assertThat(testUserRegistration.getSecondCitizenshipCode()).isEqualTo(DEFAULT_SECOND_CITIZENSHIP_CODE);
        assertThat(testUserRegistration.isSecondCitizenship()).isEqualTo(DEFAULT_SECOND_CITIZENSHIP);
    }

    @Test
    @Transactional
    public void createUserRegistrationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRegistrationRepository.findAll().size();

        // Create the UserRegistration with an existing ID
        userRegistration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRegistrationMockMvc.perform(post("/api/user-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRegistration)))
            .andExpect(status().isBadRequest());

        // Validate the UserRegistration in the database
        List<UserRegistration> userRegistrationList = userRegistrationRepository.findAll();
        assertThat(userRegistrationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserRegistrations() throws Exception {
        // Initialize the database
        userRegistrationRepository.saveAndFlush(userRegistration);

        // Get all the userRegistrationList
        restUserRegistrationMockMvc.perform(get("/api/user-registrations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRegistration.getId().intValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].citizenshipCode").value(hasItem(DEFAULT_CITIZENSHIP_CODE.toString())))
            .andExpect(jsonPath("$.[*].secondCitizenshipCode").value(hasItem(DEFAULT_SECOND_CITIZENSHIP_CODE.toString())))
            .andExpect(jsonPath("$.[*].secondCitizenship").value(hasItem(DEFAULT_SECOND_CITIZENSHIP.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getUserRegistration() throws Exception {
        // Initialize the database
        userRegistrationRepository.saveAndFlush(userRegistration);

        // Get the userRegistration
        restUserRegistrationMockMvc.perform(get("/api/user-registrations/{id}", userRegistration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRegistration.getId().intValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME.toString()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.citizenshipCode").value(DEFAULT_CITIZENSHIP_CODE.toString()))
            .andExpect(jsonPath("$.secondCitizenshipCode").value(DEFAULT_SECOND_CITIZENSHIP_CODE.toString()))
            .andExpect(jsonPath("$.secondCitizenship").value(DEFAULT_SECOND_CITIZENSHIP.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRegistration() throws Exception {
        // Get the userRegistration
        restUserRegistrationMockMvc.perform(get("/api/user-registrations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRegistration() throws Exception {
        // Initialize the database
        userRegistrationService.save(userRegistration);

        int databaseSizeBeforeUpdate = userRegistrationRepository.findAll().size();

        // Update the userRegistration
        UserRegistration updatedUserRegistration = userRegistrationRepository.findById(userRegistration.getId()).get();
        // Disconnect from session so that the updates on updatedUserRegistration are not directly saved in db
        em.detach(updatedUserRegistration);
        updatedUserRegistration
            .userName(UPDATED_USER_NAME)
            .countryCode(UPDATED_COUNTRY_CODE)
            .city(UPDATED_CITY)
            .citizenshipCode(UPDATED_CITIZENSHIP_CODE)
            .secondCitizenshipCode(UPDATED_SECOND_CITIZENSHIP_CODE)
            .secondCitizenship(UPDATED_SECOND_CITIZENSHIP);

        restUserRegistrationMockMvc.perform(put("/api/user-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserRegistration)))
            .andExpect(status().isOk());

        // Validate the UserRegistration in the database
        List<UserRegistration> userRegistrationList = userRegistrationRepository.findAll();
        assertThat(userRegistrationList).hasSize(databaseSizeBeforeUpdate);
        UserRegistration testUserRegistration = userRegistrationList.get(userRegistrationList.size() - 1);
        assertThat(testUserRegistration.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testUserRegistration.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
        assertThat(testUserRegistration.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testUserRegistration.getCitizenshipCode()).isEqualTo(UPDATED_CITIZENSHIP_CODE);
        assertThat(testUserRegistration.getSecondCitizenshipCode()).isEqualTo(UPDATED_SECOND_CITIZENSHIP_CODE);
        assertThat(testUserRegistration.isSecondCitizenship()).isEqualTo(UPDATED_SECOND_CITIZENSHIP);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRegistration() throws Exception {
        int databaseSizeBeforeUpdate = userRegistrationRepository.findAll().size();

        // Create the UserRegistration

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserRegistrationMockMvc.perform(put("/api/user-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRegistration)))
            .andExpect(status().isBadRequest());

        // Validate the UserRegistration in the database
        List<UserRegistration> userRegistrationList = userRegistrationRepository.findAll();
        assertThat(userRegistrationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserRegistration() throws Exception {
        // Initialize the database
        userRegistrationService.save(userRegistration);

        int databaseSizeBeforeDelete = userRegistrationRepository.findAll().size();

        // Get the userRegistration
        restUserRegistrationMockMvc.perform(delete("/api/user-registrations/{id}", userRegistration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserRegistration> userRegistrationList = userRegistrationRepository.findAll();
        assertThat(userRegistrationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRegistration.class);
        UserRegistration userRegistration1 = new UserRegistration();
        userRegistration1.setId(1L);
        UserRegistration userRegistration2 = new UserRegistration();
        userRegistration2.setId(userRegistration1.getId());
        assertThat(userRegistration1).isEqualTo(userRegistration2);
        userRegistration2.setId(2L);
        assertThat(userRegistration1).isNotEqualTo(userRegistration2);
        userRegistration1.setId(null);
        assertThat(userRegistration1).isNotEqualTo(userRegistration2);
    }
}
