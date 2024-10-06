package com.ucp.tcc.record.veterinarian;

import java.util.UUID;

import com.ucp.tcc.entities.Specialization;

public record VeterinarianSimpleResRecord(UUID uuid, String name, String email, String crmv, Specialization specialization) {

}
