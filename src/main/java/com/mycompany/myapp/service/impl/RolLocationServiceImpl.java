package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.RolLocationService;
import com.mycompany.myapp.domain.RolLocation;
import com.mycompany.myapp.repository.RolLocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RolLocation.
 */
@Service
@Transactional
public class RolLocationServiceImpl implements RolLocationService {

    private final Logger log = LoggerFactory.getLogger(RolLocationServiceImpl.class);

    private final RolLocationRepository rolLocationRepository;

    public RolLocationServiceImpl(RolLocationRepository rolLocationRepository) {
        this.rolLocationRepository = rolLocationRepository;
    }

    /**
     * Save a rolLocation.
     *
     * @param rolLocation the entity to save
     * @return the persisted entity
     */
    @Override
    public RolLocation save(RolLocation rolLocation) {
        log.debug("Request to save RolLocation : {}", rolLocation);        return rolLocationRepository.save(rolLocation);
    }

    /**
     * Get all the rolLocations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RolLocation> findAll() {
        log.debug("Request to get all RolLocations");
        return rolLocationRepository.findAll();
    }


    /**
     * Get one rolLocation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RolLocation> findOne(Long id) {
        log.debug("Request to get RolLocation : {}", id);
        return rolLocationRepository.findById(id);
    }

    /**
     * Delete the rolLocation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RolLocation : {}", id);
        rolLocationRepository.deleteById(id);
    }
}
