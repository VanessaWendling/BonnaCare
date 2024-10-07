package com.ucp.tcc.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.record.clinic.req.ClinicReqRecord;
import com.ucp.tcc.repositories.ClinicRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ClinicService {
	
	@Autowired
	private ClinicRepository clinicRepository;
	
	public List<Clinic> getClinics(){
		List<Clinic> clinics = clinicRepository.findAll();
		return clinics;
	}
	
	public Clinic insertClinic(ClinicReqRecord reqRecord) {
		return clinicRepository.save(new Clinic(reqRecord.name(), reqRecord.phone(), reqRecord.address()));
	}
	
	public Clinic findByUUID(UUID uuid) {
		return clinicRepository.findById(uuid)
				.orElseThrow(()-> new EntityNotFoundException("Clinic not found in the system"));
	}
}
