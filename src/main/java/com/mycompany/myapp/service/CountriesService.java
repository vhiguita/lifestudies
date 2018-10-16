package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Countries;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Countries.
 */
public interface CountriesService {

    /**
     * Save a countries.
     *
     * @param countries the entity to save
     * @return the persisted entity
     */
    Countries save(Countries countries);

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    List<Countries> findAll();


    /**
     * Get the "id" countries.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Countries> findOne(Long id);

    /**
     * Delete the "id" countries.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
