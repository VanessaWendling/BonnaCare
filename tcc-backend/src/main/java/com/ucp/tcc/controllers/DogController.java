package com.ucp.tcc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.dto.dog.DogMapper;
import com.ucp.tcc.dto.dog.DogReqRecord;
import com.ucp.tcc.dto.dog.DogResRecord;
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
	public ResponseEntity<DogResRecord> createDog(@RequestBody DogReqRecord reqRecord){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(DogMapper.fromEntity (dogService.insertDog(reqRecord)));
	}

}
