package com.ucp.tcc.record.dog;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.entities.PetLocalization;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.record.dog.res.DogResHistoricRecord;
import com.ucp.tcc.record.dog.res.DogResRecord;
import com.ucp.tcc.record.person.res.PersonResRecord;

public class DogMapper {                                  

	public static Dog fromRecord(DogReqRecord reqRecord) {
		return new Dog(reqRecord.name(), reqRecord.photo(), reqRecord.microchip(), reqRecord.breed(), reqRecord.birthday(),
				reqRecord.setOfPeopleDetails(reqRecord.keepers()), new PetLocalization(reqRecord.localizator()));
	}

	public static DogResRecord fromEntity(Dog dog) {
		return new DogResRecord(dog.getUuid(), dog.getName(), dog.getMicrochip(), dog.getBreed(), dog.getBirthday(),
				setOfPeopleDetailsRecord(dog.getKeepers()), dog.getPetLocalization(), dog.getPhoto());
	}

	public static DogResHistoricRecord fromEntityHistoricRecord(Dog dog) {
		return new DogResHistoricRecord(dog.getUuid(), dog.getName(), dog.getPhoto(), dog.getMicrochip(), dog.getBreed(), dog.getBirthday(),
				dog.getConsults());
	}

	private static Set<PersonResRecord> setOfPeopleDetailsRecord(Set<Person> people) {
		return people.stream().map(person -> new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(),
				person.getPhone(), person.getAddress())).collect(Collectors.toSet());
	}
}
