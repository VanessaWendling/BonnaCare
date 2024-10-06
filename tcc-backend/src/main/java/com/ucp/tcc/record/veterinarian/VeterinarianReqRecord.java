package com.ucp.tcc.record.veterinarian;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Specialization;

public record VeterinarianReqRecord(String name, String email, String crmv, String password, Specialization specialization, Set<UUID> clinic) {

	public Set<Clinic> setOfClinicUUID(Set<UUID> uuids){
		return uuids.stream().map(uuid -> new Clinic(uuid)).collect(Collectors.toSet());
	}
}
