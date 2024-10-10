package com.ucp.tcc.record.pet.res;

import java.util.List;
import java.util.UUID;

import com.ucp.tcc.record.consult.res.ConsultResRecord;

public record PetResHistoricRecord(UUID uuid, List<ConsultResRecord> consults) {

}
