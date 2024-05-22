package com.ucp.tcc.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.dto.person.PersonRequestDTO;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.repositories.PersonRepository;

@Service
public class PersonService {

	@Autowired
	private PersonRepository keeperRepository;

	public List<Person> getPeople() {
		return keeperRepository.findAll();
	}
	
	public Person savePerson(PersonRequestDTO personRequestDTO) {
		return keeperRepository.save(new Person(personRequestDTO.name(), personRequestDTO.email(), personRequestDTO.password(), personRequestDTO.phone(), personRequestDTO.address()));
	}
	
	public Person findKeeper(UUID uuid) throws Exception {
		return keeperRepository.findById(uuid).orElseThrow(() -> new Exception ("Not Found"));
	}

}
