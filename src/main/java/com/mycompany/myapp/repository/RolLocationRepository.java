package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RolLocation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RolLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolLocationRepository extends JpaRepository<RolLocation, Long> {

}
