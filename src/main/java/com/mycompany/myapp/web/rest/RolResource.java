package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Rol;
import com.mycompany.myapp.service.RolService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Rol.
 */
@RestController
@RequestMapping("/api")
public class RolResource {

    private final Logger log = LoggerFactory.getLogger(RolResource.class);

    private static final String ENTITY_NAME = "rol";

    private final RolService rolService;

    public RolResource(RolService rolService) {
        this.rolService = rolService;
    }

    /**
     * POST  /rols : Create a new rol.
     *
     * @param rol the rol to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rol, or with status 400 (Bad Request) if the rol has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rols")
    @Timed
    public ResponseEntity<Rol> createRol(@RequestBody Rol rol) throws URISyntaxException {
        log.debug("REST request to save Rol : {}", rol);
        if (rol.getId() != null) {
            throw new BadRequestAlertException("A new rol cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rol result = rolService.save(rol);
        return ResponseEntity.created(new URI("/api/rols/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rols : Updates an existing rol.
     *
     * @param rol the rol to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rol,
     * or with status 400 (Bad Request) if the rol is not valid,
     * or with status 500 (Internal Server Error) if the rol couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rols")
    @Timed
    public ResponseEntity<Rol> updateRol(@RequestBody Rol rol) throws URISyntaxException {
        log.debug("REST request to update Rol : {}", rol);
        if (rol.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rol result = rolService.save(rol);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rol.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rols : get all the rols.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rols in body
     */
    @GetMapping("/rols")
    @Timed
    public List<Rol> getAllRols() {
        log.debug("REST request to get all Rols");
        return rolService.findAll();
    }

    /**
     * GET  /rols/:id : get the "id" rol.
     *
     * @param id the id of the rol to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rol, or with status 404 (Not Found)
     */
    @GetMapping("/rols/{id}")
    @Timed
    public ResponseEntity<Rol> getRol(@PathVariable Long id) {
        log.debug("REST request to get Rol : {}", id);
        Optional<Rol> rol = rolService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rol);
    }

    /**
     * DELETE  /rols/:id : delete the "id" rol.
     *
     * @param id the id of the rol to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rols/{id}")
    @Timed
    public ResponseEntity<Void> deleteRol(@PathVariable Long id) {
        log.debug("REST request to delete Rol : {}", id);
        rolService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
