package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.UserRegistration;
import com.mycompany.myapp.service.UserRegistrationService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserRegistration.
 */
@RestController
@RequestMapping("/api")
public class UserRegistrationResource {

    private final Logger log = LoggerFactory.getLogger(UserRegistrationResource.class);

    private static final String ENTITY_NAME = "userRegistration";

    private final UserRegistrationService userRegistrationService;

    public UserRegistrationResource(UserRegistrationService userRegistrationService) {
        this.userRegistrationService = userRegistrationService;
    }

    /**
     * POST  /user-registrations : Create a new userRegistration.
     *
     * @param userRegistration the userRegistration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userRegistration, or with status 400 (Bad Request) if the userRegistration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-registrations")
    @Timed
    public ResponseEntity<UserRegistration> createUserRegistration(@RequestBody UserRegistration userRegistration) throws URISyntaxException {
        log.debug("REST request to save UserRegistration : {}", userRegistration);
        if (userRegistration.getId() != null) {
            throw new BadRequestAlertException("A new userRegistration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRegistration result = userRegistrationService.save(userRegistration);
        return ResponseEntity.created(new URI("/api/user-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-registrations : Updates an existing userRegistration.
     *
     * @param userRegistration the userRegistration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userRegistration,
     * or with status 400 (Bad Request) if the userRegistration is not valid,
     * or with status 500 (Internal Server Error) if the userRegistration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-registrations")
    @Timed
    public ResponseEntity<UserRegistration> updateUserRegistration(@RequestBody UserRegistration userRegistration) throws URISyntaxException {
        log.debug("REST request to update UserRegistration : {}", userRegistration);
        if (userRegistration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserRegistration result = userRegistrationService.save(userRegistration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userRegistration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-registrations : get all the userRegistrations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userRegistrations in body
     */
    @GetMapping("/user-registrations")
    @Timed
    public ResponseEntity<List<UserRegistration>> getAllUserRegistrations(Pageable pageable) {
        log.debug("REST request to get a page of UserRegistrations");
        Page<UserRegistration> page = userRegistrationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-registrations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-registrations/:id : get the "id" userRegistration.
     *
     * @param id the id of the userRegistration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userRegistration, or with status 404 (Not Found)
     */
    @GetMapping("/user-registrations/{id}")
    @Timed
    public ResponseEntity<UserRegistration> getUserRegistration(@PathVariable Long id) {
        log.debug("REST request to get UserRegistration : {}", id);
        Optional<UserRegistration> userRegistration = userRegistrationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userRegistration);
    }

    /**
     * DELETE  /user-registrations/:id : delete the "id" userRegistration.
     *
     * @param id the id of the userRegistration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-registrations/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserRegistration(@PathVariable Long id) {
        log.debug("REST request to delete UserRegistration : {}", id);
        userRegistrationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
