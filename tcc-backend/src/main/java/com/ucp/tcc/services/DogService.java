package com.ucp.tcc.services;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.repositories.DogRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DogService {

	@Autowired
	private DogRepository dogRepository;

	@Autowired
	private PersonService personService;

	public List<Dog> getDogs() {
		return dogRepository.findAll();
	}

	public Dog insertDog(DogReqRecord reqRecord) {
		Set<Person> person = reqRecord.keepers().stream().map(uuid -> personService.getKeeperById(uuid))
				.collect(Collectors.toSet());
		return dogRepository
				.save(new Dog(reqRecord.name(), reqRecord.microchip(), reqRecord.breed(), reqRecord.weight(), reqRecord.age(), person));
	}

	public Dog findDogByUUID(UUID uuid) {
		return dogRepository.findById(uuid).orElseThrow(() -> new EntityNotFoundException("Dog not found in the system"));
		
	}

}
