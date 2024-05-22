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

import com.ucp.tcc.dto.person.PersonRequestDTO;
import com.ucp.tcc.dto.person.PersonResponseDTO;
import com.ucp.tcc.services.PersonService;

@RestController
@RequestMapping("/person")
public class PersonController {

	@Autowired
	private PersonService personService;

	@GetMapping
	public ResponseEntity<List<PersonResponseDTO>> getAll() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(personService.getPeople().stream().map(PersonResponseDTO::new).toList());
	}

	@PostMapping
	public ResponseEntity<PersonResponseDTO> createUser(@RequestBody PersonRequestDTO personRequestDTO) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new PersonResponseDTO(personService.savePerson(personRequestDTO)));
	}
}
