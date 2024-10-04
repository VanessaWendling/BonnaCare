package com.ucp.tcc.record.dog.req;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Person;

public record DogReqRecord(String name, String photo, String microchip, Breeds breed, 
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
		Date birthday, Set<UUID> keepers, String localizator) {

	public Set<Person> setOfPeopleDetails(Set<UUID> uuids){
		return uuids.stream().map(uuid -> new Person(uuid)).collect(Collectors.toSet());
	}
	
}
