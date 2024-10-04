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

import com.ucp.tcc.record.dog.DogMapper;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.record.dog.res.DogResHistoricRecord;
import com.ucp.tcc.record.dog.res.DogResRecord;
import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.services.DogService;

@RestController
@RequestMapping("/dogs")
public class DogController {

	@Autowired
	private DogService dogService;

	@GetMapping
	public ResponseEntity<List<DogResRecord>> getDogs() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(dogService.getDogs().stream().map(DogMapper::fromEntity).toList());
	}

	@PostMapping
	public ResponseEntity<DogResRecord> createDog(@RequestBody DogReqRecord reqRecord) {
		return ResponseEntity.status(HttpStatus.CREATED).body(DogMapper.fromEntity(dogService.insertDog(reqRecord)));
	}

	@GetMapping("/{uuid}")
	public ResponseEntity<DogResRecord> getDogByUUID(@PathVariable UUID uuid) {
		return ResponseEntity.status(HttpStatus.OK).body(DogMapper.fromEntity(dogService.findDogByUUID(uuid)));
	}

	@GetMapping("/medicalhistory/{uuid}")
	public ResponseEntity<DogResHistoricRecord> getDogMedicalHistoryByUUID(@PathVariable UUID uuid) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(DogMapper.fromEntityHistoricRecord(dogService.findDogByUUID(uuid)));
	}

	@PutMapping("/localization")
	public ResponseEntity<String> createLocalizationPositionRef(@RequestBody LocalizationReqRecord reqRecord) {
		dogService.createPositionRef(reqRecord);
		return ResponseEntity.ok().body("Pontos de referencia recebidos com sucesso.");
	}
}
