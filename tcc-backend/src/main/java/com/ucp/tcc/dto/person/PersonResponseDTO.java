package com.ucp.tcc.dto.person;

import java.util.UUID;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.entities.Person;

public record PersonResponseDTO(UUID uuid, String name, String email, String phone, Address address) {
	
	public PersonResponseDTO(Person person) {
		this(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress());
	}
}
