package com.ucp.tcc.record.veterinarian;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Specialization;
import com.ucp.tcc.record.clinic.res.ClinicVetResRecord;

public record VeterinarianResRecord(UUID uuid, String name, String crmv, Specialization specialization, Set<ClinicVetResRecord> clinic) {

}
