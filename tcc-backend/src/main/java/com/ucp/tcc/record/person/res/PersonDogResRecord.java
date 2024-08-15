package com.ucp.tcc.record.person.res;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.record.dog.res.DogBasicResRecord;

public record PersonDogResRecord(UUID uuid, String name, String email, String phone, Address address, Set<DogBasicResRecord> dogs) {

	
}
