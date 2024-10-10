package com.ucp.tcc.record.pet.res;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Pet;
import com.ucp.tcc.entities.PetLocalization;

public record PetBasicResRecord(UUID uuid, String name, String photo, Breeds breed, String microchip,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") Date birthday, PetLocalization petLocalization) {
	public Set<PetBasicResRecord> setOfPets(Set<UUID> uuids) {
		return uuids.stream().map(uuid -> {
			Pet pet = new Pet(uuid);
			return new PetBasicResRecord(pet.getUuid(), pet.getName(), pet.getPhoto(), pet.getBreed(),
					pet.getMicrochip(), pet.getBirthday(), pet.getPetLocalization());
		}).collect(Collectors.toSet());
	}
}
