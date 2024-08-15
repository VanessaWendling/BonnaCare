package com.ucp.tcc.record.dog;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.record.dog.res.DogResHistoricRecord;
import com.ucp.tcc.record.dog.res.DogResRecord;
import com.ucp.tcc.record.person.res.PersonResRecord;

public class DogMapper {
	
	public static Dog fromRecord(DogReqRecord reqRecord) {
		return new Dog(reqRecord.name(), reqRecord.microchip(), reqRecord.breed(), reqRecord.weight(), reqRecord.age(), reqRecord.setOfPeopleDetails(reqRecord.keepers()));
	}
	
	public static DogResRecord fromEntity(Dog dog) {
		return new DogResRecord(dog.getUuid(), dog.getName(), dog.getMicrochip(), dog.getBreed(), dog.getWeight(),	dog.getAge(), setOfPeopleDetailsRecord(dog.getKeepers()));
	}
	
	public static DogResHistoricRecord fromEntityHistoricRecord(Dog dog) {
		return new DogResHistoricRecord(dog.getUuid(), dog.getName(), dog.getMicrochip(), dog.getBreed(), dog.getWeight(),	dog.getAge(), dog.getMedicalHistory());
	}
	
	private static Set<PersonResRecord> setOfPeopleDetailsRecord(Set<Person> people){
		return people.stream().map(person -> new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress())).collect(Collectors.toSet());
	}
}
