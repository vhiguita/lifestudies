package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CountryLocation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CountryLocation.
 */
public interface CountryLocationService {

    /**
     * Save a countryLocation.
     *
     * @param countryLocation the entity to save
     * @return the persisted entity
     */
    CountryLocation save(CountryLocation countryLocation);

    /**
     * Get all the countryLocations.
     *
     * @return the list of entities
     */
    List<CountryLocation> findAll();


    /**
     * Get the "id" countryLocation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CountryLocation> findOne(Long id);

    /**
     * Delete the "id" countryLocation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
