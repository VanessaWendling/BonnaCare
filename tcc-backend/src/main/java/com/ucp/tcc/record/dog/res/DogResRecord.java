package com.ucp.tcc.record.dog.res;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ucp.tcc.entities.Breeds;
import com.ucp.tcc.entities.PetLocalization;
import com.ucp.tcc.record.person.res.PersonResRecord;

public record DogResRecord(UUID uuid, String name, String microchip, Breeds breed,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") Date birthday,
		Set<PersonResRecord> keepers, PetLocalization petLocalizator, String photo) {

}
