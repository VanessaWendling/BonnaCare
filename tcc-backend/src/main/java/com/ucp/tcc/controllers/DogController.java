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

import com.ucp.tcc.dto.dog.DogRequestDTO;
import com.ucp.tcc.dto.dog.DogResponseDTO;
import com.ucp.tcc.services.DogService;

@RestController
@RequestMapping("/dogs")
public class DogController {

	@Autowired
	private DogService dogService;

	@GetMapping
	public ResponseEntity<List<DogResponseDTO>> getDogs() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(dogService.getDogs().stream().map(DogResponseDTO::new).toList());
	}
	
	@PostMapping
	public ResponseEntity<DogResponseDTO> createDog(@RequestBody DogRequestDTO dogRequestDTO){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new DogResponseDTO(dogService.insertDog(dogRequestDTO)));
	}

}
