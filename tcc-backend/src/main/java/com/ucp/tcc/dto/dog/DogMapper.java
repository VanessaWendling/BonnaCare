package com.ucp.tcc.dto.dog;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.dto.person.PersonResRecord;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;

public class DogMapper {
	
	public static Dog fromRecord(DogReqRecord reqRecord) {
		return new Dog(reqRecord.name(), reqRecord.breed(), reqRecord.weight(), reqRecord.age(), reqRecord.setOfPeopleDetails(reqRecord.keepers()));
	}
	
	public static DogResRecord fromEntity(Dog dog) {
		return new DogResRecord(dog.getUuid(), dog.getName(), dog.getBreed(), dog.getWeight(),	dog.getAge(), setOfPeopleDetailsRecord(dog.getKeepers()));
	}
	
	
	private static Set<PersonResRecord> setOfPeopleDetailsRecord(Set<Person> people){
		return people.stream().map(person -> new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress())).collect(Collectors.toSet());
	}
}
