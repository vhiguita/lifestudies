package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;

import com.mycompany.myapp.domain.Rol;
import com.mycompany.myapp.repository.RolRepository;
import com.mycompany.myapp.service.RolService;
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
 * Test class for the RolResource REST controller.
 *
 * @see RolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class RolResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RolRepository rolRepository;
    
    @Autowired
    private RolService rolService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRolMockMvc;

    private Rol rol;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolResource rolResource = new RolResource(rolService);
        this.restRolMockMvc = MockMvcBuilders.standaloneSetup(rolResource)
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
    public static Rol createEntity(EntityManager em) {
        Rol rol = new Rol()
            .description(DEFAULT_DESCRIPTION);
        return rol;
    }

    @Before
    public void initTest() {
        rol = createEntity(em);
    }

    @Test
    @Transactional
    public void createRol() throws Exception {
        int databaseSizeBeforeCreate = rolRepository.findAll().size();

        // Create the Rol
        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rol)))
            .andExpect(status().isCreated());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeCreate + 1);
        Rol testRol = rolList.get(rolList.size() - 1);
        assertThat(testRol.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolRepository.findAll().size();

        // Create the Rol with an existing ID
        rol.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rol)))
            .andExpect(status().isBadRequest());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRols() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);

        // Get all the rolList
        restRolMockMvc.perform(get("/api/rols?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rol.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getRol() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);

        // Get the rol
        restRolMockMvc.perform(get("/api/rols/{id}", rol.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rol.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRol() throws Exception {
        // Get the rol
        restRolMockMvc.perform(get("/api/rols/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRol() throws Exception {
        // Initialize the database
        rolService.save(rol);

        int databaseSizeBeforeUpdate = rolRepository.findAll().size();

        // Update the rol
        Rol updatedRol = rolRepository.findById(rol.getId()).get();
        // Disconnect from session so that the updates on updatedRol are not directly saved in db
        em.detach(updatedRol);
        updatedRol
            .description(UPDATED_DESCRIPTION);

        restRolMockMvc.perform(put("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRol)))
            .andExpect(status().isOk());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeUpdate);
        Rol testRol = rolList.get(rolList.size() - 1);
        assertThat(testRol.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRol() throws Exception {
        int databaseSizeBeforeUpdate = rolRepository.findAll().size();

        // Create the Rol

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolMockMvc.perform(put("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rol)))
            .andExpect(status().isBadRequest());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRol() throws Exception {
        // Initialize the database
        rolService.save(rol);

        int databaseSizeBeforeDelete = rolRepository.findAll().size();

        // Get the rol
        restRolMockMvc.perform(delete("/api/rols/{id}", rol.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rol.class);
        Rol rol1 = new Rol();
        rol1.setId(1L);
        Rol rol2 = new Rol();
        rol2.setId(rol1.getId());
        assertThat(rol1).isEqualTo(rol2);
        rol2.setId(2L);
        assertThat(rol1).isNotEqualTo(rol2);
        rol1.setId(null);
        assertThat(rol1).isNotEqualTo(rol2);
    }
}
