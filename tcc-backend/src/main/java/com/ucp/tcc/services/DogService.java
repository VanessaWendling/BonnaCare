package com.ucp.tcc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.repositories.DogRepository;

@Service
public class DogService {
	
	@Autowired
	private DogRepository dogRepository;
	
	public List<Dog> getDogs() {
		return dogRepository.findAll();
	}

	public Dog insertDog(Dog dog) {
		return dogRepository.save(dog);
	}
	
}
