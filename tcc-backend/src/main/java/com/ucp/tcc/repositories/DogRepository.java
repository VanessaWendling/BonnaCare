package com.ucp.tcc.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Dog;

public interface DogRepository extends JpaRepository<Dog, UUID>{
	Optional<Dog> findByPetLocalization_Localizator(String localizator);
}
