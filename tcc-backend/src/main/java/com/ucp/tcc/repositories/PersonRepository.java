package com.ucp.tcc.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Person;

public interface PersonRepository extends JpaRepository<Person, UUID>{
	 Optional<Person> findByEmail(String email);
}
