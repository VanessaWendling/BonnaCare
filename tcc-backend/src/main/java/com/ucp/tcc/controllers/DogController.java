package com.ucp.tcc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.services.DogService;

@RestController
@RequestMapping("/dogs")
public class DogController {
	
	@Autowired
	private DogService dogService;
	
	@GetMapping
	public ResponseEntity <List<Dog>> getDogs(){
		return ResponseEntity.ok(dogService.getDogs());
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Dog inserir(@RequestBody Dog dog) {
		return dogService.insertDog(dog);
	}
	
}
