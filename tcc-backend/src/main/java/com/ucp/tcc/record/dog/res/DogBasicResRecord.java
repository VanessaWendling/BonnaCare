package com.ucp.tcc.record.dog.res;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Dog;

public record DogBasicResRecord(UUID uuid, String name, Breeds breed, String microchip, Double weight, Long age) {
	public Set<DogBasicResRecord> setOfDogs(Set<UUID> uuids) {
		return uuids.stream().map(uuid -> {
			Dog dog = new Dog(uuid);
			return new DogBasicResRecord(dog.getUuid(), dog.getName(), dog.getBreed(), dog.getMicrochip(), dog.getWeight(), dog.getAge());
		}).collect(Collectors.toSet());
	}
}
