package com.ucp.tcc.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ucp.tcc.entities.Pet;

public interface PetRepository extends JpaRepository<Pet, UUID>{
	@Query("SELECT d FROM Pet d LEFT JOIN FETCH d.consults c WHERE d.uuid = :uuid ORDER BY c.date DESC")
    Optional<Pet> findPetWithConsultsOrderedByDate(UUID uuid);
	Optional<Pet> findByPetLocalization_Localizator(String localizator);
	Optional<Pet> findByMicrochip(String microchip);
}
