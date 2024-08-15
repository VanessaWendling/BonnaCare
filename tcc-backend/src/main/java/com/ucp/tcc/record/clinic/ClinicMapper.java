package com.ucp.tcc.record.clinic;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.record.clinic.res.ClinicResRecord;

public class ClinicMapper {
	public static ClinicResRecord fromEntity(Clinic clinic) {
		return new ClinicResRecord(clinic.getUuid(), clinic.getName(), clinic.getPhone(), clinic.getAddress(), clinic.getVeterinarians());
	}
}
