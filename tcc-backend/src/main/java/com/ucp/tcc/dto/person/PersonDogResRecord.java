package com.ucp.tcc.dto.person;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.dto.dog.DogBasicResRecord;
import com.ucp.tcc.entities.Address;

public record PersonDogResRecord(UUID uuid, String name, String email, String phone, Address address, Set<DogBasicResRecord> dogs) {

	
}
