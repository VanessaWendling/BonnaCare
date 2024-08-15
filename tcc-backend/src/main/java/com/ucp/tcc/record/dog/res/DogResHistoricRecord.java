package com.ucp.tcc.record.dog.res;

import java.util.UUID;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.MedicalHistory;

public record DogResHistoricRecord(UUID uuid, String name, String microchip, Breeds breed, Double weight, Long age, MedicalHistory medicalHistory ) {

}
