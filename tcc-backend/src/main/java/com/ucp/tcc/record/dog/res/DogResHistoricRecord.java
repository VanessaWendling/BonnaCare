package com.ucp.tcc.record.dog.res;

import java.util.List;
import java.util.UUID;

import com.ucp.tcc.record.consult.res.ConsultResRecord;

public record DogResHistoricRecord(UUID uuid, List<ConsultResRecord> consults) {

}
