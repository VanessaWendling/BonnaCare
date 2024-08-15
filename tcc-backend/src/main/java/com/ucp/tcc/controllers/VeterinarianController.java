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

import com.ucp.tcc.record.veterinarian.VetMapper;
import com.ucp.tcc.record.veterinarian.VeterinarianReqRecord;
import com.ucp.tcc.record.veterinarian.VeterinarianResRecord;
import com.ucp.tcc.services.VeterinarianService;

@RestController
@RequestMapping("/vet")
public class VeterinarianController {
	
	@Autowired
	private VeterinarianService veterinarianService;
	
	@GetMapping()
	public ResponseEntity<List<VeterinarianResRecord>> getAllVets(){
		return ResponseEntity.status(HttpStatus.OK)
				.body(veterinarianService.getVeterinarians().stream().map(VetMapper::fromEntity).toList());
	}
	
	@PostMapping()
	public ResponseEntity<VeterinarianResRecord> createVet(@RequestBody VeterinarianReqRecord reqRecord){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(VetMapper.fromEntity(veterinarianService.insertVeterinarian(reqRecord)));
		
	}
}
