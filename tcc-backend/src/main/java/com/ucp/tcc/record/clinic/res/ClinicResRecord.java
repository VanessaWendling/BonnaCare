package com.ucp.tcc.record.clinic.res;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.record.veterinarian.VeterinarianSimpleResRecord;

public record ClinicResRecord(UUID uuid, String name, String phone, Address address, Set<VeterinarianSimpleResRecord> veterinarians) {

}
