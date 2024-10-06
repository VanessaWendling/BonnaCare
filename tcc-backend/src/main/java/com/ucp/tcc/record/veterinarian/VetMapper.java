package com.ucp.tcc.record.veterinarian;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.record.clinic.res.ClinicVetResRecord;

public class VetMapper {

	public static VeterinarianResRecord fromEntity(Veterinarian veterinarian) {
		return new VeterinarianResRecord(veterinarian.getUuid(), veterinarian.getName(), veterinarian.getEmail(),
				veterinarian.getCrmv(), veterinarian.getSpecialization(), clinicVetDetails(veterinarian.getClinics()));
	}

	public static VeterinarianSimpleResRecord fromSimpleEntity(Veterinarian veterinarian) {
		return new VeterinarianSimpleResRecord(veterinarian.getUuid(), veterinarian.getName(), veterinarian.getEmail(),
				veterinarian.getCrmv(), veterinarian.getSpecialization());
	}

	public static Veterinarian fromRecord(VeterinarianReqRecord reqRecord) {
		return new Veterinarian(reqRecord.name(), reqRecord.email(), reqRecord.crmv(), reqRecord.specialization(),
				reqRecord.password(), reqRecord.setOfClinicUUID(reqRecord.clinic()));
	}

	private static Set<ClinicVetResRecord> clinicVetDetails(Set<Clinic> clinics) {
		return clinics.stream().map(clinic -> new ClinicVetResRecord(clinic.getUuid(), clinic.getName(),
				clinic.getPhone(), clinic.getAddress())).collect(Collectors.toSet());
	}
}
