package com.ucp.tcc.dto.dog;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.dto.person.PersonResRecord;
import com.ucp.tcc.entities.Breeds;

public record DogResRecord(UUID uuid, String name, Breeds breed, Double weight, Long age, Set<PersonResRecord> keepers) {
	
}
