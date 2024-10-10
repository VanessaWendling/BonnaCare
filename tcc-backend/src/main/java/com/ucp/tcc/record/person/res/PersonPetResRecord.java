package com.ucp.tcc.record.person.res;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.record.pet.res.PetBasicResRecord;

public record PersonPetResRecord(UUID uuid, String name, String photo, String email, String phone, Address address, Set<PetBasicResRecord> pets) {

	
}
