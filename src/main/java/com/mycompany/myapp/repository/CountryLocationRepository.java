package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CountryLocation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CountryLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryLocationRepository extends JpaRepository<CountryLocation, Long> {

}
