package com.ucp.tcc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.auth.Login;
import com.ucp.tcc.record.auth.Token;
import com.ucp.tcc.services.AuthenticationService;

@RestController
@RequestMapping("/login")
public class AuthController {

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping
	public Token authenticate(@RequestBody Login login) {
		return authenticationService.authenticate(login);
	}

}