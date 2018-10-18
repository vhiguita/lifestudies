package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CountryLocation;
import com.mycompany.myapp.service.CountryLocationService;
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
 * REST controller for managing CountryLocation.
 */
@RestController
@RequestMapping("/api")
public class CountryLocationResource {

    private final Logger log = LoggerFactory.getLogger(CountryLocationResource.class);

    private static final String ENTITY_NAME = "countryLocation";

    private final CountryLocationService countryLocationService;

    public CountryLocationResource(CountryLocationService countryLocationService) {
        this.countryLocationService = countryLocationService;
    }

    /**
     * POST  /country-locations : Create a new countryLocation.
     *
     * @param countryLocation the countryLocation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new countryLocation, or with status 400 (Bad Request) if the countryLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/country-locations")
    @Timed
    public ResponseEntity<CountryLocation> createCountryLocation(@RequestBody CountryLocation countryLocation) throws URISyntaxException {
        log.debug("REST request to save CountryLocation : {}", countryLocation);
        if (countryLocation.getId() != null) {
            throw new BadRequestAlertException("A new countryLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CountryLocation result = countryLocationService.save(countryLocation);
        return ResponseEntity.created(new URI("/api/country-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /country-locations : Updates an existing countryLocation.
     *
     * @param countryLocation the countryLocation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated countryLocation,
     * or with status 400 (Bad Request) if the countryLocation is not valid,
     * or with status 500 (Internal Server Error) if the countryLocation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/country-locations")
    @Timed
    public ResponseEntity<CountryLocation> updateCountryLocation(@RequestBody CountryLocation countryLocation) throws URISyntaxException {
        log.debug("REST request to update CountryLocation : {}", countryLocation);
        if (countryLocation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CountryLocation result = countryLocationService.save(countryLocation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, countryLocation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /country-locations : get all the countryLocations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of countryLocations in body
     */
    @GetMapping("/country-locations")
    @Timed
    public List<CountryLocation> getAllCountryLocations() {
        log.debug("REST request to get all CountryLocations");
        return countryLocationService.findAll();
    }

    /**
     * GET  /country-locations/:id : get the "id" countryLocation.
     *
     * @param id the id of the countryLocation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the countryLocation, or with status 404 (Not Found)
     */
    @GetMapping("/country-locations/{id}")
    @Timed
    public ResponseEntity<CountryLocation> getCountryLocation(@PathVariable Long id) {
        log.debug("REST request to get CountryLocation : {}", id);
        Optional<CountryLocation> countryLocation = countryLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(countryLocation);
    }

    /**
     * DELETE  /country-locations/:id : delete the "id" countryLocation.
     *
     * @param id the id of the countryLocation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/country-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCountryLocation(@PathVariable Long id) {
        log.debug("REST request to delete CountryLocation : {}", id);
        countryLocationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
