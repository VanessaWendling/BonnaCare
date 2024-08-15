package com.ucp.tcc.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Clinic;

public interface ClinicRepository extends JpaRepository<Clinic, UUID>{

}
