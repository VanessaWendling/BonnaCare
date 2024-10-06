package com.ucp.tcc.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Person;
import com.ucp.tcc.exception.EmailAlreadyExistsException;
import com.ucp.tcc.record.person.req.PersonReqRecord;
import com.ucp.tcc.repositories.PersonRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PersonService {

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private PersonRepository keeperRepository;

	public List<Person> getPeople() {
		return keeperRepository.findAll();
	}

	public Person savePerson(PersonReqRecord reqRecord) {
		Optional<Person> existingPerson = keeperRepository.findByEmail(reqRecord.email());
		if (existingPerson.isPresent())
			throw new EmailAlreadyExistsException("Email já está em uso.");

		return keeperRepository.save(new Person(reqRecord.name(), reqRecord.photo(), reqRecord.email(),
				passwordEncoder.encode(reqRecord.password()), reqRecord.phone(), reqRecord.address()));
	}

	public Person getKeeperById(UUID uuid) {
		return keeperRepository.findById(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Person not found in the system"));
	}

}
