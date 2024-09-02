package com.ucp.tcc.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.statics.StaticsMapper;
import com.ucp.tcc.record.statics.res.VaccineResRecord;
import com.ucp.tcc.services.VaccineService;

@RestController
@RequestMapping("/vaccines")
public class VaccineController {

	@Autowired
	private VaccineService vaccineService;

	@GetMapping()
	public ResponseEntity<Set<VaccineResRecord>> listOfVaccines() {
		return ResponseEntity.status(HttpStatus.OK).body(
				vaccineService.getAll().stream().map(StaticsMapper::fromVaccineEntity)
				.collect(Collectors.toSet()));
	}

}
