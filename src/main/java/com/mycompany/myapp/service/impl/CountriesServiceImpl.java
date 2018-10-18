package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CountriesService;
import com.mycompany.myapp.domain.Countries;
import com.mycompany.myapp.repository.CountriesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Countries.
 */
@Service
@Transactional
public class CountriesServiceImpl implements CountriesService {

    private final Logger log = LoggerFactory.getLogger(CountriesServiceImpl.class);

    private final CountriesRepository countriesRepository;

    public CountriesServiceImpl(CountriesRepository countriesRepository) {
        this.countriesRepository = countriesRepository;
    }

    /**
     * Save a countries.
     *
     * @param countries the entity to save
     * @return the persisted entity
     */
    @Override
    public Countries save(Countries countries) {
        log.debug("Request to save Countries : {}", countries);        return countriesRepository.save(countries);
    }

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Countries> findAll() {
        log.debug("Request to get all Countries");
        return countriesRepository.findAll();
    }


    /**
     * Get one countries by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Countries> findOne(Long id) {
        log.debug("Request to get Countries : {}", id);
        return countriesRepository.findById(id);
    }

    /**
     * Delete the countries by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Countries : {}", id);
        countriesRepository.deleteById(id);
    }
}
