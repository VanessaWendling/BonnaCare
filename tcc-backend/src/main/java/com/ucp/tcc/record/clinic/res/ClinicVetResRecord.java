package com.ucp.tcc.record.clinic.res;

import java.util.UUID;

import com.ucp.tcc.entities.Address;

public record ClinicVetResRecord(UUID uuid, String name, String phone, Address address) {

}
