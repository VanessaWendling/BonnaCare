package com.ucp.tcc.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Localization;
import com.ucp.tcc.entities.Pet;
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

	public String savePosition(LocalizationReqRecord locReqRecord) {
		Optional<Pet> pet = petService.findByLocalizator(locReqRecord.chipID());
		if (pet.isPresent()) {
			Double distanceFromRef = GeoCalculator.haversine(pet.get().getPetLocalization().getLatitudeRef(),
					pet.get().getPetLocalization().getLongitudeRef(), Double.parseDouble(locReqRecord.latitude()),
					Double.parseDouble(locReqRecord.longitude()));

			// se a distância for superior a 30 metros do referencial
			if (distanceFromRef > 0.05) {
				List<Localization> petLastLocalization = localizationRepository
						.findLastByLocalizator(pet.get().getPetLocalization().getLocalizator(), PageRequest.of(0, 1));

				if (!petLastLocalization.isEmpty()) {
					Double distanceFromLast = GeoCalculator.haversine(petLastLocalization.get(0).getLatitude(),
							petLastLocalization.get(0).getLongitude(), Double.parseDouble(locReqRecord.latitude()),
							Double.parseDouble(locReqRecord.longitude()));
					
					// Distância menor que 15 metros 
					if (distanceFromLast < 0.015) {
						// Atualizar apenas o horário da última localização
						petLastLocalization.get(0).setDate(new Date());
						localizationRepository.save(petLastLocalization.get(0));
						return "Update Position > 0.15 from Last Position";
					} else {
						localizationRepository.save(
								new Localization(locReqRecord.chipID(), Double.parseDouble(locReqRecord.latitude()),
										Double.parseDouble(locReqRecord.longitude())));
						return "Save Position > 0.5 from Referencial and Position > 0.15 from Last Position";
					}
				}
			}
			return "Nothing to do";
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
