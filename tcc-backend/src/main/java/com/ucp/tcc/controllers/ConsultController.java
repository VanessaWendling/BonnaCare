package com.ucp.tcc.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.consult.ConsultMapper;
import com.ucp.tcc.record.consult.req.ConsultReqRecord;
import com.ucp.tcc.record.consult.res.ConsultResRecord;
import com.ucp.tcc.services.ConsultService;

@RestController
@RequestMapping("/consult")
public class ConsultController {

	@Autowired
	private ConsultService consultService;

	@PostMapping
	public ResponseEntity<ConsultResRecord> createConsult(@RequestBody ConsultReqRecord reqRecord) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ConsultMapper.fromEntity(consultService.createConsult(reqRecord)));
	}

	@GetMapping
	public ResponseEntity<Set<ConsultResRecord>> getAll() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(consultService.getAll().stream()
						.map(ConsultMapper::fromEntity).collect(Collectors.toSet()));
	}
}
