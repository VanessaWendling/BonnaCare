package com.ucp.tcc.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Veterinarian;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, UUID>{

}
