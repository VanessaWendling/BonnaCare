package com.ucp.tcc.dto.person;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.entities.Person;

public record PersonRequestDTO(String name, String email, String password, String phone, Address address) {

	public PersonRequestDTO(Person person) {
		this(person.getName(), person.getEmail(), person.getPassword(), person.getPhone(), person.getAddress());
	}
}
