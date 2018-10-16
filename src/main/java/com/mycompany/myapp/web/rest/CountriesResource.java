package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Countries;
import com.mycompany.myapp.service.CountriesService;
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
 * REST controller for managing Countries.
 */
@RestController
@RequestMapping("/api")
public class CountriesResource {

    private final Logger log = LoggerFactory.getLogger(CountriesResource.class);

    private static final String ENTITY_NAME = "countries";

    private final CountriesService countriesService;

    public CountriesResource(CountriesService countriesService) {
        this.countriesService = countriesService;
    }

    /**
     * POST  /countries : Create a new countries.
     *
     * @param countries the countries to create
     * @return the ResponseEntity with status 201 (Created) and with body the new countries, or with status 400 (Bad Request) if the countries has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/countries")
    @Timed
    public ResponseEntity<Countries> createCountries(@RequestBody Countries countries) throws URISyntaxException {
        log.debug("REST request to save Countries : {}", countries);
        if (countries.getId() != null) {
            throw new BadRequestAlertException("A new countries cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Countries result = countriesService.save(countries);
        return ResponseEntity.created(new URI("/api/countries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /countries : Updates an existing countries.
     *
     * @param countries the countries to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated countries,
     * or with status 400 (Bad Request) if the countries is not valid,
     * or with status 500 (Internal Server Error) if the countries couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/countries")
    @Timed
    public ResponseEntity<Countries> updateCountries(@RequestBody Countries countries) throws URISyntaxException {
        log.debug("REST request to update Countries : {}", countries);
        if (countries.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Countries result = countriesService.save(countries);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, countries.getId().toString()))
            .body(result);
    }

    /**
     * GET  /countries : get all the countries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of countries in body
     */
    @GetMapping("/countries")
    @Timed
    public List<Countries> getAllCountries() {
        log.debug("REST request to get all Countries");
        return countriesService.findAll();
    }

    /**
     * GET  /countries/:id : get the "id" countries.
     *
     * @param id the id of the countries to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the countries, or with status 404 (Not Found)
     */
    @GetMapping("/countries/{id}")
    @Timed
    public ResponseEntity<Countries> getCountries(@PathVariable Long id) {
        log.debug("REST request to get Countries : {}", id);
        Optional<Countries> countries = countriesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(countries);
    }

    /**
     * DELETE  /countries/:id : delete the "id" countries.
     *
     * @param id the id of the countries to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/countries/{id}")
    @Timed
    public ResponseEntity<Void> deleteCountries(@PathVariable Long id) {
        log.debug("REST request to delete Countries : {}", id);
        countriesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
