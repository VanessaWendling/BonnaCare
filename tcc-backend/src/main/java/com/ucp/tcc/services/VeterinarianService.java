package com.ucp.tcc.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.record.veterinarian.VeterinarianReqRecord;
import com.ucp.tcc.repositories.VeterinarianRepository;

@Service
public class VeterinarianService {

	@Autowired
	private VeterinarianRepository veterinarianRepository;

	@Autowired
	private ClinicService clinicService;

	public List<Veterinarian> getVeterinarians() {
		return veterinarianRepository.findAll();
	}

	public Veterinarian insertVeterinarian(VeterinarianReqRecord reqRecord) {
		Set<Clinic> clinics = reqRecord.clinic().stream().map(uuid -> clinicService.findByUUID(uuid))
				.collect(Collectors.toSet());
		return veterinarianRepository
				.save(new Veterinarian(reqRecord.name(), reqRecord.crmv(), reqRecord.specialization(), clinics));
	}

}
