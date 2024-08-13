package com.ucp.tcc.dto.person;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.dto.dog.DogBasicResRecord;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;

public class PersonMapper {

	public static Person fromDTO(PersonRequestDTO dto) {
		return new Person(dto.getName(), dto.getEmail(), dto.getPassword(), dto.getPhone(), dto.getAddress());
	}

	public static PersonResponseDTO fromEntityD(Person person) {
		return new PersonResponseDTO(person.getUuid(), person.getName(), person.getEmail(), person.getPhone(),
				person.getAddress());
	}

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
