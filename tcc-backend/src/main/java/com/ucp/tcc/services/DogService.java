package com.ucp.tcc.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.dto.dog.DogReqRecord;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.repositories.DogRepository;

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
		Set<Person> person = reqRecord.keepers().stream().map(uuid -> {
			try {
				return personService.findKeeper(uuid);
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toSet());
		return dogRepository.save(new Dog(reqRecord.name(), reqRecord.breed(), reqRecord.weight(),
				reqRecord.age(), person));
	}

}
