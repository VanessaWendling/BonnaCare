package com.ucp.tcc.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.exception.EmailAlreadyExistsException;
import com.ucp.tcc.record.veterinarian.VeterinarianReqRecord;
import com.ucp.tcc.repositories.VeterinarianRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VeterinarianService {

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private VeterinarianRepository veterinarianRepository;

	@Autowired
	private ClinicService clinicService;

	public List<Veterinarian> getVeterinarians() {
		return veterinarianRepository.findAll();
	}

	public Veterinarian insertVeterinarian(VeterinarianReqRecord reqRecord) {
		Optional<Veterinarian> existingVeterinarian = veterinarianRepository.findByEmail(reqRecord.email());
		if (existingVeterinarian.isPresent())
			throw new EmailAlreadyExistsException("Email já está em uso.");

		Set<Clinic> clinics = reqRecord.clinic().stream().map(uuid -> clinicService.findByUUID(uuid))
				.collect(Collectors.toSet());
		return veterinarianRepository.save(new Veterinarian(reqRecord.name(), reqRecord.email(), reqRecord.crmv(),
				reqRecord.specialization(), passwordEncoder.encode(reqRecord.password()), clinics));
	}

	public Veterinarian findByUUID(UUID uuid) {
		return veterinarianRepository.findById(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Veterinarian not found in the system"));
	}

}
