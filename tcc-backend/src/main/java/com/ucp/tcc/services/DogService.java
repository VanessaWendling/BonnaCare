package com.ucp.tcc.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.entities.PetLocalization;
import com.ucp.tcc.exception.MicrochipDogNotFound;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.repositories.DogRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DogService {

	@Autowired
	private DogRepository dogRepository;

	@Autowired
	private PersonService personService;

	public List<Dog> getDogs() {
		return dogRepository.findAll();
	}

	public Dog insertDog(DogReqRecord reqRecord) {
		Set<Person> person = reqRecord.keepers().stream().map(uuid -> personService.getKeeperById(uuid))
				.collect(Collectors.toSet());
		return dogRepository.save(new Dog(reqRecord.name(), reqRecord.photo(), reqRecord.microchip(), reqRecord.breed(),
				reqRecord.birthday(), person, new PetLocalization(reqRecord.localizator())));
	}

	public Dog findDogByUUID(UUID uuid) {
//		return dogRepository.findById(uuid)
//				.orElseThrow(() -> new EntityNotFoundException("Dog not found in the system"));
		return dogRepository.findDogWithConsultsOrderedByDate(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Dog not found in the system"));
	}

	public boolean createPositionRef(LocalizationReqRecord reqRecord) {
		Optional<Dog> optionalDog = findByLocalizator(reqRecord.chipID());
		if (optionalDog.isPresent()) {
			Dog dog = optionalDog.get();
			dog.setPetLocalization(new PetLocalization(reqRecord.chipID(), Double.parseDouble(reqRecord.latitude()),
					Double.parseDouble(reqRecord.longitude())));
			dogRepository.save(dog);
			return true;
		}
		throw new EntityNotFoundException("Dog with localizator " + reqRecord.chipID() + " not found");
	}

	public Optional<Dog> findByLocalizator(String chipID) {
		Optional<Dog> optionalDog = dogRepository.findByPetLocalization_Localizator(chipID);
		return optionalDog;
	}

	public Dog findByMicrochip(String microchip) {
		Optional<Dog> optionalDog = dogRepository.findByMicrochip(microchip);
		if (optionalDog.isPresent()) {
			return optionalDog.get();
		}
		throw new MicrochipDogNotFound("Microchip " + microchip + " does not exist in our database.");
	}
}
