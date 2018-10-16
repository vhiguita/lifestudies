package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CountryLocationService;
import com.mycompany.myapp.domain.CountryLocation;
import com.mycompany.myapp.repository.CountryLocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CountryLocation.
 */
@Service
@Transactional
public class CountryLocationServiceImpl implements CountryLocationService {

    private final Logger log = LoggerFactory.getLogger(CountryLocationServiceImpl.class);

    private final CountryLocationRepository countryLocationRepository;

    public CountryLocationServiceImpl(CountryLocationRepository countryLocationRepository) {
        this.countryLocationRepository = countryLocationRepository;
    }

    /**
     * Save a countryLocation.
     *
     * @param countryLocation the entity to save
     * @return the persisted entity
     */
    @Override
    public CountryLocation save(CountryLocation countryLocation) {
        log.debug("Request to save CountryLocation : {}", countryLocation);        return countryLocationRepository.save(countryLocation);
    }

    /**
     * Get all the countryLocations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CountryLocation> findAll() {
        log.debug("Request to get all CountryLocations");
        return countryLocationRepository.findAll();
    }


    /**
     * Get one countryLocation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CountryLocation> findOne(Long id) {
        log.debug("Request to get CountryLocation : {}", id);
        return countryLocationRepository.findById(id);
    }

    /**
     * Delete the countryLocation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CountryLocation : {}", id);
        countryLocationRepository.deleteById(id);
    }
}
