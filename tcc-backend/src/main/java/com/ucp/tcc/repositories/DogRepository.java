package com.ucp.tcc.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ucp.tcc.entities.Dog;

public interface DogRepository extends JpaRepository<Dog, UUID>{
	@Query("SELECT d FROM Dog d LEFT JOIN FETCH d.consults c WHERE d.uuid = :uuid ORDER BY c.date DESC")
    Optional<Dog> findDogWithConsultsOrderedByDate(UUID uuid);
	Optional<Dog> findByPetLocalization_Localizator(String localizator);
	Optional<Dog> findByMicrochip(String microchip);
}
