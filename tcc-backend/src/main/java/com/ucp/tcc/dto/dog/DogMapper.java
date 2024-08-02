package com.ucp.tcc.dto.dog;

import com.ucp.tcc.entities.Dog;

public class DogMapper {
	
	public static Dog fromRecord(DogReqRecord reqRecord) {
		return new Dog(reqRecord.name(), reqRecord.breed(), reqRecord.weight(), reqRecord.age(), reqRecord.setOfPeopleDetails(reqRecord.keepers()));
	}
	
	public static DogResRecord fromEntity(Dog dog) {
		return new DogResRecord(dog.getUuid(), dog.getName(), dog.getBreed(), dog.getWeight(),	dog.getAge(), dog.getKeepers());
	}
}
