package com.ucp.tcc.dto.dog;

import java.util.Set;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;

public record DogRequestDTO(String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {
	public DogRequestDTO(Dog dog) {
		this(dog.getName(), dog.getBreed(), dog.getWeight(), dog.getAge(), dog.getKeepers());
	}
}
