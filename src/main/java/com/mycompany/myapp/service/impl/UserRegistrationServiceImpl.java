package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.UserRegistrationService;
import com.mycompany.myapp.domain.UserRegistration;
import com.mycompany.myapp.repository.UserRegistrationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing UserRegistration.
 */
@Service
@Transactional
public class UserRegistrationServiceImpl implements UserRegistrationService {

    private final Logger log = LoggerFactory.getLogger(UserRegistrationServiceImpl.class);

    private final UserRegistrationRepository userRegistrationRepository;

    public UserRegistrationServiceImpl(UserRegistrationRepository userRegistrationRepository) {
        this.userRegistrationRepository = userRegistrationRepository;
    }

    /**
     * Save a userRegistration.
     *
     * @param userRegistration the entity to save
     * @return the persisted entity
     */
    @Override
    public UserRegistration save(UserRegistration userRegistration) {
        log.debug("Request to save UserRegistration : {}", userRegistration);        return userRegistrationRepository.save(userRegistration);
    }

    /**
     * Get all the userRegistrations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserRegistration> findAll(Pageable pageable) {
        log.debug("Request to get all UserRegistrations");
        return userRegistrationRepository.findAll(pageable);
    }


    /**
     * Get one userRegistration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserRegistration> findOne(Long id) {
        log.debug("Request to get UserRegistration : {}", id);
        return userRegistrationRepository.findById(id);
    }

    /**
     * Delete the userRegistration by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserRegistration : {}", id);
        userRegistrationRepository.deleteById(id);
    }
}
