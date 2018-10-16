package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.RolLocation;
import com.mycompany.myapp.service.RolLocationService;
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
 * REST controller for managing RolLocation.
 */
@RestController
@RequestMapping("/api")
public class RolLocationResource {

    private final Logger log = LoggerFactory.getLogger(RolLocationResource.class);

    private static final String ENTITY_NAME = "rolLocation";

    private final RolLocationService rolLocationService;

    public RolLocationResource(RolLocationService rolLocationService) {
        this.rolLocationService = rolLocationService;
    }

    /**
     * POST  /rol-locations : Create a new rolLocation.
     *
     * @param rolLocation the rolLocation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rolLocation, or with status 400 (Bad Request) if the rolLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rol-locations")
    @Timed
    public ResponseEntity<RolLocation> createRolLocation(@RequestBody RolLocation rolLocation) throws URISyntaxException {
        log.debug("REST request to save RolLocation : {}", rolLocation);
        if (rolLocation.getId() != null) {
            throw new BadRequestAlertException("A new rolLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolLocation result = rolLocationService.save(rolLocation);
        return ResponseEntity.created(new URI("/api/rol-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rol-locations : Updates an existing rolLocation.
     *
     * @param rolLocation the rolLocation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rolLocation,
     * or with status 400 (Bad Request) if the rolLocation is not valid,
     * or with status 500 (Internal Server Error) if the rolLocation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rol-locations")
    @Timed
    public ResponseEntity<RolLocation> updateRolLocation(@RequestBody RolLocation rolLocation) throws URISyntaxException {
        log.debug("REST request to update RolLocation : {}", rolLocation);
        if (rolLocation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RolLocation result = rolLocationService.save(rolLocation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rolLocation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rol-locations : get all the rolLocations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rolLocations in body
     */
    @GetMapping("/rol-locations")
    @Timed
    public List<RolLocation> getAllRolLocations() {
        log.debug("REST request to get all RolLocations");
        return rolLocationService.findAll();
    }

    /**
     * GET  /rol-locations/:id : get the "id" rolLocation.
     *
     * @param id the id of the rolLocation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rolLocation, or with status 404 (Not Found)
     */
    @GetMapping("/rol-locations/{id}")
    @Timed
    public ResponseEntity<RolLocation> getRolLocation(@PathVariable Long id) {
        log.debug("REST request to get RolLocation : {}", id);
        Optional<RolLocation> rolLocation = rolLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rolLocation);
    }

    /**
     * DELETE  /rol-locations/:id : delete the "id" rolLocation.
     *
     * @param id the id of the rolLocation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rol-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRolLocation(@PathVariable Long id) {
        log.debug("REST request to delete RolLocation : {}", id);
        rolLocationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
