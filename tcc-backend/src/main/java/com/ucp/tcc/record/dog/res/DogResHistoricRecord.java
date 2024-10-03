package com.ucp.tcc.record.dog.res;

import java.util.Set;
import java.util.UUID;

import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Consult;

public record DogResHistoricRecord(UUID uuid, String name, String microchip, Breeds breed, Long age,
		Set<Consult> consults) {

}
