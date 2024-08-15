package com.ucp.tcc.record.person;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.record.dog.res.DogBasicResRecord;
import com.ucp.tcc.record.person.req.PersonReqRecord;
import com.ucp.tcc.record.person.res.PersonDogResRecord;
import com.ucp.tcc.record.person.res.PersonResRecord;

public class PersonMapper {

	public static Person fromRecord(PersonReqRecord reqRecord) {
		return new Person(reqRecord.name(), reqRecord.email(), reqRecord.password(), reqRecord.phone(),
				reqRecord.address());
	}

	public static PersonResRecord fromEntity(Person person) {
		return new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress());
	}

	public static PersonDogResRecord fromEntityDog(Person person) {
		return new PersonDogResRecord(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(), person.getAddress(), fromDogToDogBasicResRecord(person.getDogs()));
	}
	
	private static  Set<DogBasicResRecord> fromDogToDogBasicResRecord (Set<Dog> dogs){
		return dogs.stream().map(dog -> new DogBasicResRecord(dog.getUuid(), dog.getName(), dog.getBreed(), dog.getWeight(), dog.getAge())).collect(Collectors.toSet());
	}
	
	
}
