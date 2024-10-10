package com.ucp.tcc.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Person;
import com.ucp.tcc.entities.Pet;
import com.ucp.tcc.entities.PetLocalization;
import com.ucp.tcc.exception.MicrochipPetNotFound;
import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.record.pet.req.PetReqRecord;
import com.ucp.tcc.repositories.PetRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PetService {

	@Autowired
	private PetRepository petRepository;

	@Autowired
	private PersonService personService;

	public List<Pet> getPets() {
		return petRepository.findAll();
	}

	public Pet insertPet(PetReqRecord reqRecord) {
		Set<Person> person = reqRecord.keepers().stream().map(uuid -> personService.getKeeperById(uuid))
				.collect(Collectors.toSet());
		return petRepository.save(new Pet(reqRecord.name(), reqRecord.photo(), reqRecord.microchip(), reqRecord.breed(),
				reqRecord.birthday(), person, new PetLocalization(reqRecord.localizator())));
	}

	public Pet findPetByUUID(UUID uuid) {
//		return petRepository.findById(uuid)
//				.orElseThrow(() -> new EntityNotFoundException("Pet not found in the system"));
		return petRepository.findPetWithConsultsOrderedByDate(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Pet not found in the system"));
	}

	public boolean createPositionRef(LocalizationReqRecord reqRecord) {
		Optional<Pet> optionalPet = findByLocalizator(reqRecord.chipID());
		if (optionalPet.isPresent()) {
			Pet pet = optionalPet.get();
			pet.setPetLocalization(new PetLocalization(reqRecord.chipID(), Double.parseDouble(reqRecord.latitude()),
					Double.parseDouble(reqRecord.longitude())));
			petRepository.save(pet);
			return true;
		}
		throw new EntityNotFoundException("Pet with localizator " + reqRecord.chipID() + " not found");
	}

	public Optional<Pet> findByLocalizator(String chipID) {
		Optional<Pet> optionalPet = petRepository.findByPetLocalization_Localizator(chipID);
		return optionalPet;
	}

	public Pet findByMicrochip(String microchip) {
		Optional<Pet> optionalPet = petRepository.findByMicrochip(microchip);
		if (optionalPet.isPresent()) {
			return optionalPet.get();
		}
		throw new MicrochipPetNotFound("Microchip " + microchip + " does not exist in our database.");
	}
}
