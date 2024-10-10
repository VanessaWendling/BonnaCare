package com.ucp.tcc.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Pet;
import com.ucp.tcc.entities.Localization;
import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.repositories.LocalizationRepository;
import com.ucp.tcc.utils.GeoCalculator;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LocalizationService {

	@Autowired
	private LocalizationRepository localizationRepository;

	@Autowired
	private PetService petService;

	public boolean savePosition(LocalizationReqRecord locReqRecord) {
		Optional<Pet> pet = petService.findByLocalizator(locReqRecord.chipID());
		if (pet.isPresent()) {
			Double distanceFromRef = GeoCalculator.haversine(pet.get().getPetLocalization().getLatitudeRef(),
					pet.get().getPetLocalization().getLongitudeRef(), Double.parseDouble(locReqRecord.latitude()),
					Double.parseDouble(locReqRecord.longitude()));
			
			if (distanceFromRef > 0.05) //se a distância for superior a 30 metros do referencial
				localizationRepository.save(new Localization(locReqRecord.chipID(),
						Double.parseDouble(locReqRecord.latitude()), Double.parseDouble(locReqRecord.longitude())));
			return true;
		}
		throw new EntityNotFoundException("Pet with localizator " + locReqRecord.chipID() + " not found");
	}

	public List<Localization> getAllByLocalizator(String localizator) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		Date startDate = calendar.getTime();

		return localizationRepository.findAllByLocalizatorLastMonth(localizator, startDate);
	}
}
