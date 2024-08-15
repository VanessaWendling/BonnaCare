package com.ucp.tcc.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Vaccine;

public interface VaccineRepository extends JpaRepository<Vaccine, UUID>{

}
