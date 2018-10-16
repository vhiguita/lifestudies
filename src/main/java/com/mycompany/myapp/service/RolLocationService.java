package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.RolLocation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing RolLocation.
 */
public interface RolLocationService {

    /**
     * Save a rolLocation.
     *
     * @param rolLocation the entity to save
     * @return the persisted entity
     */
    RolLocation save(RolLocation rolLocation);

    /**
     * Get all the rolLocations.
     *
     * @return the list of entities
     */
    List<RolLocation> findAll();


    /**
     * Get the "id" rolLocation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RolLocation> findOne(Long id);

    /**
     * Delete the "id" rolLocation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
