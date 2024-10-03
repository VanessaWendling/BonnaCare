package com.ucp.tcc.record.dog.res;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.Consult;

public record DogResHistoricRecord(UUID uuid, String name, String photo, String microchip, Breeds breed,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") Date birthday, Set<Consult> consults) {

}
