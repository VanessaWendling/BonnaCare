package com.ucp.tcc.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Keeper;
import com.ucp.tcc.exception.EmailAlreadyExistsException;
import com.ucp.tcc.record.person.req.PersonReqRecord;
import com.ucp.tcc.repositories.KeeperRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PersonService {

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private KeeperRepository keeperRepository;

	public List<Keeper> getPeople() {
		return keeperRepository.findAll();
	}

	public Keeper savePerson(PersonReqRecord reqRecord) {
		Optional<Keeper> existingPerson = keeperRepository.findByEmail(reqRecord.email());
		if (existingPerson.isPresent())
			throw new EmailAlreadyExistsException("Email já está em uso.");

		return keeperRepository.save(new Keeper(reqRecord.name(), reqRecord.photo(), reqRecord.email(),
				passwordEncoder.encode(reqRecord.password()), reqRecord.phone(), reqRecord.address()));
	}

	public Keeper getKeeperById(UUID uuid) {
		return keeperRepository.findById(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Person not found in the system"));
	}

}
