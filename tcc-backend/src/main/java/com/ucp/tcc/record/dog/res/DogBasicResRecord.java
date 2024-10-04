package com.ucp.tcc.record.dog.res;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.PetLocalization;

public record DogBasicResRecord(UUID uuid, String name, String photo, Breeds breed, String microchip,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") Date birthday, PetLocalization petLocalization) {
	public Set<DogBasicResRecord> setOfDogs(Set<UUID> uuids) {
		return uuids.stream().map(uuid -> {
			Dog dog = new Dog(uuid);
			return new DogBasicResRecord(dog.getUuid(), dog.getName(), dog.getPhoto(), dog.getBreed(),
					dog.getMicrochip(), dog.getBirthday(), dog.getPetLocalization());
		}).collect(Collectors.toSet());
	}
}
