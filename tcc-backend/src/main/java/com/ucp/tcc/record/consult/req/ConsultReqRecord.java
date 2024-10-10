package com.ucp.tcc.record.consult.req;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.ConsultType;
import com.ucp.tcc.entities.Vaccine;

public record ConsultReqRecord(Date date, String reason, String observations, String treatmentPlan,
		ConsultType consultType, Double weight, Set<UUID> vaccines, Set<ExamResultReqRecord> exams, UUID vet,
		UUID clinic, UUID pet) {

	public Set<Vaccine> setOfVaccinesUUID(Set<UUID> uuids) {
		return uuids.stream().map(uuid -> new Vaccine(uuid)).collect(Collectors.toSet());
	}
}
