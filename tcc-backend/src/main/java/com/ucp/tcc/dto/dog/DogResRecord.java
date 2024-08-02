package com.ucp.tcc.dto.dog;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Person;

public record DogResRecord(UUID uuid, String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {

	public Set<Person> setOfPeople(Set<UUID> uuids){
		return uuids.stream().map(uuid -> new Person(uuid)).collect(Collectors.toSet());
	}
	
}
