package com.ucp.tcc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.dto.dog.DogRequestDTO;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.repositories.DogRepository;
import com.ucp.tcc.repositories.PersonRepository;

@Service
public class DogService {

	@Autowired
	private DogRepository dogRepository;
	
	@Autowired
	private PersonService personService;

	public List<Dog> getDogs() {
		return dogRepository.findAll();
	}

	public Dog insertDog(DogRequestDTO dogRequestDTO) {
		return dogRepository.save(new Dog(dogRequestDTO.name(), dogRequestDTO.breed(), dogRequestDTO.weight(),
				dogRequestDTO.age(), dogRequestDTO.keepers()));
	}

}
