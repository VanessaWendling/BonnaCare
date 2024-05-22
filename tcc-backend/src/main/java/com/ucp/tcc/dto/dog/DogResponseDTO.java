package com.ucp.tcc.dto.dog;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;

public record DogResponseDTO(UUID uuid, String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {
	public DogResponseDTO(Dog dog) {
		this(dog.getUuid(), dog.getName(), dog.getBreed(), dog.getWeight(), dog.getAge(), dog.getKeepers());
	}
}
