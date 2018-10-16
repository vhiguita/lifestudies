package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.UserRegistration;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing UserRegistration.
 */
public interface UserRegistrationService {

    /**
     * Save a userRegistration.
     *
     * @param userRegistration the entity to save
     * @return the persisted entity
     */
    UserRegistration save(UserRegistration userRegistration);

    /**
     * Get all the userRegistrations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UserRegistration> findAll(Pageable pageable);


    /**
     * Get the "id" userRegistration.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UserRegistration> findOne(Long id);

    /**
     * Delete the "id" userRegistration.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
