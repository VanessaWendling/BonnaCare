package com.ucp.tcc.record.pet.req;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Keeper;

public record PetReqRecord(String name, String photo, String microchip, Breeds breed, 
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
		Date birthday, Set<UUID> keepers, String localizator) {

	public Set<Keeper> setOfPeopleDetails(Set<UUID> uuids){
		return uuids.stream().map(uuid -> new Keeper(uuid)).collect(Collectors.toSet());
	}
	
}
