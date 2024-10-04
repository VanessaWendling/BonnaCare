package com.ucp.tcc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.loc.LocalizationMapper;
import com.ucp.tcc.record.loc.LocalizationReqRecord;
import com.ucp.tcc.record.loc.LocalizationResRecord;
import com.ucp.tcc.services.LocalizationService;

@RestController
@RequestMapping("/localization")
public class LocalizationController {

	@Autowired
	private LocalizationService localizationService;

	@PostMapping
	public ResponseEntity<String> receiveGPSData(@RequestBody LocalizationReqRecord reqRecord) {
		localizationService.savePosition(reqRecord);
		return ResponseEntity.ok("Dados recebidos com sucesso");
	}

	@GetMapping("/{localizator}")
	public ResponseEntity<List<LocalizationResRecord>> getAllByChipID(@PathVariable String localizator) {
		return ResponseEntity.ok().body(localizationService.getAllByLocalizator(localizator).stream()
				.map(LocalizationMapper::fromEntity).toList());
	}

}
