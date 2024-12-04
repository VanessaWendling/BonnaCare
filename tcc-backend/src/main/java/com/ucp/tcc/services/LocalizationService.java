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

@Service
public class LocalizationService {

	@Autowired
	private LocalizationRepository localizationRepository;

	@Autowired
	private PetService petService;

	public String savePosition(LocalizationReqRecord locReqRecord) {
		Optional<Pet> pet = petService.findByLocalizator(locReqRecord.chipID());

		if (pet.isPresent() && pet.get().getPetLocalization().getLatitudeRef() != null) {

			Double distanceFromRef = GeoCalculator.haversine(pet.get().getPetLocalization().getLatitudeRef(),
					pet.get().getPetLocalization().getLongitudeRef(), Double.parseDouble(locReqRecord.latitude()),
					Double.parseDouble(locReqRecord.longitude()));

			if (distanceFromRef > 0.05) { // Distância maior que 50 metros do referencial
				List<Localization> petLastLocalization = localizationRepository
						.findLastByLocalizator(pet.get().getPetLocalization().getLocalizator(), PageRequest.of(0, 1));

				if (!petLastLocalization.isEmpty()) {
					Double distanceFromLast = GeoCalculator.haversine(petLastLocalization.get(0).getLatitude(),
							petLastLocalization.get(0).getLongitude(), Double.parseDouble(locReqRecord.latitude()),
							Double.parseDouble(locReqRecord.longitude()));

					if (distanceFromLast < 0.015) { // Distância menor que 15 metros
						petLastLocalization.get(0).setDate(new Date());
						localizationRepository.save(petLastLocalization.get(0));
						return String.format("Atualizar - Posição < 0.15m da última posição. Diferença de: %.4f m.", distanceFromLast);
					} else {
						localizationRepository.save(
								new Localization(locReqRecord.chipID(), Double.parseDouble(locReqRecord.latitude()),
										Double.parseDouble(locReqRecord.longitude())));
						return String.format("Salvar - Posição > 0.5m do referencial E posição > 0.15m da última posição. Diferença de: %.4f m.", distanceFromLast);
					}
				} else {
					localizationRepository.save(new Localization(locReqRecord.chipID(),
							Double.parseDouble(locReqRecord.latitude()), Double.parseDouble(locReqRecord.longitude())));
					return String.format("Salvar - Posição > 0.5m do referencial. Diferença de: %.4f m.", distanceFromRef );
				}
			}
			return String.format("Em casa - Nada a fazer. Diferença de: %.4f m.", distanceFromRef);
		}
		return "Pet nao encontrado ou localizacao de referecia não foi marcada.";
	}

	public List<Localization> getAllByLocalizator(String localizator) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		Date startDate = calendar.getTime();

		return localizationRepository.findAllByLocalizatorLastMonth(localizator, startDate);
	}
}
