package com.ucp.tcc.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.record.pet.PetMapper;
import com.ucp.tcc.record.pet.req.PetLocalizatorReqRecord;
import com.ucp.tcc.record.pet.req.PetReqRecord;
import com.ucp.tcc.record.pet.res.PetResHistoricRecord;
import com.ucp.tcc.record.pet.res.PetResRecord;
import com.ucp.tcc.services.PetService;

@RestController
@RequestMapping("/pets")
public class PetController {

	@Autowired
	private PetService petService;

	@GetMapping
	public ResponseEntity<List<PetResRecord>> getPets() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(petService.getPets().stream().map(PetMapper::fromEntity).toList());
	}

	@PostMapping
	public ResponseEntity<PetResRecord> createPet(@RequestBody PetReqRecord reqRecord) {
		return ResponseEntity.status(HttpStatus.CREATED).body(PetMapper.fromEntity(petService.insertPet(reqRecord)));
	}

	@GetMapping("/{uuid}")
	public ResponseEntity<PetResRecord> getPetByUUID(@PathVariable UUID uuid) {
		return ResponseEntity.status(HttpStatus.OK).body(PetMapper.fromEntity(petService.findPetByUUID(uuid)));
	}

	@GetMapping("/medicalhistory/{uuid}")
	public ResponseEntity<PetResHistoricRecord> getPetMedicalHistoryByUUID(@PathVariable UUID uuid) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(PetMapper.fromEntityHistoricRecord(petService.findPetByUUID(uuid)));
	}
	
	@PutMapping("/localizator")
	public ResponseEntity<String> putLocalizatorByUUID(@RequestBody PetLocalizatorReqRecord reqRecord) {
		petService.putLocalizatorByUUID(reqRecord);
		return ResponseEntity.ok().body("Localizator changed!");
	}

	@PutMapping("/localization")
	public ResponseEntity<String> createLocalizationPositionRef(@RequestBody LocalizationReqRecord reqRecord) {
		petService.createPositionRef(reqRecord);
		return ResponseEntity.ok().body("Pontos de referencia recebidos com sucesso.");
	}
	
	@GetMapping("/microchip/{microchip}")
	public ResponseEntity<PetResRecord> getpetMedicalHistoryByMicrochip(@PathVariable String microchip) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(PetMapper.fromEntity(petService.findByMicrochip(microchip)));
	}
}
