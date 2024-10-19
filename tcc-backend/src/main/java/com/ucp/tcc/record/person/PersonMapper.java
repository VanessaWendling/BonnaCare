package com.ucp.tcc.record.person;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Keeper;
import com.ucp.tcc.entities.Pet;
import com.ucp.tcc.record.person.req.PersonReqRecord;
import com.ucp.tcc.record.person.res.PersonPetResRecord;
import com.ucp.tcc.record.person.res.PersonResRecord;
import com.ucp.tcc.record.pet.res.PetBasicResRecord;

public class PersonMapper {

	public static Keeper fromRecord(PersonReqRecord reqRecord) {
		return new Keeper(reqRecord.name(), reqRecord.photo(), reqRecord.email(), reqRecord.password(), reqRecord.phone(),
				reqRecord.address());
	}

	public static PersonResRecord fromEntity(Keeper person) {
		return new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress());
	}

	public static PersonPetResRecord fromEntityPet(Keeper person) {
		return new PersonPetResRecord(person.getUuid(), person.getName(), person.getPhoto(), person.getEmail(), person.getPhone(), person.getAddress(), fromPetToPetBasicResRecord(person.getPets()));
	}
	
	private static  Set<PetBasicResRecord> fromPetToPetBasicResRecord (Set<Pet> pets){
		return pets.stream().map(pet -> new PetBasicResRecord(pet.getUuid(), pet.getName(), pet.getPhoto(), pet.getBreed(), pet.getMicrochip(), pet.getBirthday(), pet.getPetLocalization())).collect(Collectors.toSet());
	}
	
	
}
