package com.ucp.tcc.record.dog.res;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.record.person.res.PersonResRecord;

public record DogResRecord(UUID uuid, String name, String microchip, Breeds breed, Double weight, Long age, Set<PersonResRecord> keepers) {
	
}
