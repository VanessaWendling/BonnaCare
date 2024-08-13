package com.ucp.tcc.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.dto.person.PersonReqRecord;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.repositories.PersonRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PersonService {

	@Autowired
	private PersonRepository keeperRepository;

	public List<Person> getPeople() {
		List<Person> people = keeperRepository.findAll();
		return people;
	}
	
	public Person savePerson(PersonReqRecord reqRecord) {
		return keeperRepository.save(new Person(reqRecord.name(), reqRecord.email(), reqRecord.password(), reqRecord.phone(), reqRecord.address()));
	}
	
	public Person getKeeperById(UUID uuid) {
		return keeperRepository.findById(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Person not found in the system"));
	}

}
