package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.RolService;
import com.mycompany.myapp.domain.Rol;
import com.mycompany.myapp.repository.RolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Rol.
 */
@Service
@Transactional
public class RolServiceImpl implements RolService {

    private final Logger log = LoggerFactory.getLogger(RolServiceImpl.class);

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    /**
     * Save a rol.
     *
     * @param rol the entity to save
     * @return the persisted entity
     */
    @Override
    public Rol save(Rol rol) {
        log.debug("Request to save Rol : {}", rol);        return rolRepository.save(rol);
    }

    /**
     * Get all the rols.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Rol> findAll() {
        log.debug("Request to get all Rols");
        return rolRepository.findAll();
    }


    /**
     * Get one rol by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Rol> findOne(Long id) {
        log.debug("Request to get Rol : {}", id);
        return rolRepository.findById(id);
    }

    /**
     * Delete the rol by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rol : {}", id);
        rolRepository.deleteById(id);
    }
}
