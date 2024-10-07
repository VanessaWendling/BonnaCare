package com.ucp.tcc.record.consult.res;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.ConsultType;
import com.ucp.tcc.record.clinic.res.ClinicVetResRecord;
import com.ucp.tcc.record.veterinarian.VeterinarianSimpleResRecord;

public record ConsultResRecord(UUID uuid, Date date, String reason, String observations, String treatmentPlan,
		ConsultType consultType, Double weight, Set<VaccineResRecord> vaccines, Set<ExamResRecord> exams,
		VeterinarianSimpleResRecord veterinarian, ClinicVetResRecord clinic) {

}
