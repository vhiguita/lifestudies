package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserRegistration.
 */
@Entity
@Table(name = "user_registration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRegistration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "city")
    private String city;

    @Column(name = "citizenship_code")
    private String citizenshipCode;

    @Column(name = "second_citizenship_code")
    private String secondCitizenshipCode;

    @Column(name = "second_citizenship")
    private Boolean secondCitizenship;

    @OneToOne
    @JoinColumn(unique = true)
    private Rol rol;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public UserRegistration userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public UserRegistration countryCode(String countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCity() {
        return city;
    }

    public UserRegistration city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCitizenshipCode() {
        return citizenshipCode;
    }

    public UserRegistration citizenshipCode(String citizenshipCode) {
        this.citizenshipCode = citizenshipCode;
        return this;
    }

    public void setCitizenshipCode(String citizenshipCode) {
        this.citizenshipCode = citizenshipCode;
    }

    public String getSecondCitizenshipCode() {
        return secondCitizenshipCode;
    }

    public UserRegistration secondCitizenshipCode(String secondCitizenshipCode) {
        this.secondCitizenshipCode = secondCitizenshipCode;
        return this;
    }

    public void setSecondCitizenshipCode(String secondCitizenshipCode) {
        this.secondCitizenshipCode = secondCitizenshipCode;
    }

    public Boolean isSecondCitizenship() {
        return secondCitizenship;
    }

    public UserRegistration secondCitizenship(Boolean secondCitizenship) {
        this.secondCitizenship = secondCitizenship;
        return this;
    }

    public void setSecondCitizenship(Boolean secondCitizenship) {
        this.secondCitizenship = secondCitizenship;
    }

    public Rol getRol() {
        return rol;
    }

    public UserRegistration rol(Rol rol) {
        this.rol = rol;
        return this;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserRegistration userRegistration = (UserRegistration) o;
        if (userRegistration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userRegistration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserRegistration{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", countryCode='" + getCountryCode() + "'" +
            ", city='" + getCity() + "'" +
            ", citizenshipCode='" + getCitizenshipCode() + "'" +
            ", secondCitizenshipCode='" + getSecondCitizenshipCode() + "'" +
            ", secondCitizenship='" + isSecondCitizenship() + "'" +
            "}";
    }
}
