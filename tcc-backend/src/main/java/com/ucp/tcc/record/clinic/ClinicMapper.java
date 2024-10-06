package com.ucp.tcc.record.clinic;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.record.clinic.res.ClinicResRecord;
import com.ucp.tcc.record.clinic.res.ClinicVetResRecord;
import com.ucp.tcc.record.veterinarian.VeterinarianSimpleResRecord;

public class ClinicMapper {
	public static ClinicResRecord fromEntity(Clinic clinic) {
		return new ClinicResRecord(clinic.getUuid(), clinic.getName(), clinic.getPhone(), clinic.getAddress(),
				vetSimpleDetails(clinic.getVeterinarians()));
	}

	public static ClinicVetResRecord fromEntitySimple(Clinic clinic) {
		return new ClinicVetResRecord(clinic.getUuid(), clinic.getName(), clinic.getPhone(), clinic.getAddress());
	}

	private static Set<VeterinarianSimpleResRecord> vetSimpleDetails(Set<Veterinarian> veterinarian) {
		return veterinarian.stream().map(vet -> new VeterinarianSimpleResRecord(vet.getUuid(), vet.getName(),
				vet.getEmail(), vet.getCrmv(), vet.getSpecialization())).collect(Collectors.toSet());
	}
}
