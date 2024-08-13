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

import com.ucp.tcc.dto.person.PersonDogResRecord;
import com.ucp.tcc.dto.person.PersonMapper;
import com.ucp.tcc.dto.person.PersonReqRecord;
import com.ucp.tcc.dto.person.PersonResRecord;
import com.ucp.tcc.services.PersonService;

@RestController
@RequestMapping("/person")
public class PersonController {

	@Autowired
	private PersonService personService;

	@GetMapping
	public ResponseEntity<List<PersonDogResRecord>> getAll() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(personService.getPeople().stream().map(PersonMapper::fromEntityDog).toList());
	}

	@PostMapping
	public ResponseEntity<PersonResRecord> createUser(@RequestBody PersonReqRecord reqRecord) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(PersonMapper.fromEntity(personService.savePerson(reqRecord)));
	}
}
