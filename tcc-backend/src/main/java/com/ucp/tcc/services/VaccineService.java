package com.ucp.tcc.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.repositories.VaccineRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VaccineService {

	@Autowired
	private VaccineRepository vaccineRepository;
	
	public Vaccine saveVaccine(Vaccine vaccine) {
		return vaccineRepository.save(vaccine);
	}
	
	public List<Vaccine> getAll(){
		return vaccineRepository.findAll();
	}
	
	public Vaccine findByUUID(UUID uuid) {
		return vaccineRepository.findById(uuid).orElseThrow(() -> new EntityNotFoundException("Vaccine not found in the system"));
	}
}
