package com.ucp.tcc.record.dog.req;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Person;

public record DogReqRecord(String name, String microchip, Breeds breed, Double weight, Long age, Set<UUID> keepers) {

	public Set<Person> setOfPeopleDetails(Set<UUID> uuids){
		return uuids.stream().map(uuid -> new Person(uuid)).collect(Collectors.toSet());
	}
	
}
