package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserRegistration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserRegistration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRegistrationRepository extends JpaRepository<UserRegistration, Long> {

}
