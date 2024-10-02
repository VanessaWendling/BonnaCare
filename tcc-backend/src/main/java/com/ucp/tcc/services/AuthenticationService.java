package com.ucp.tcc.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ucp.tcc.record.auth.Login;
import com.ucp.tcc.record.auth.Token;

@Service
public class AuthenticationService {

	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(JwtService jwtService, AuthenticationManager authenticationManager) {
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	};

	public Token authenticate(Login login) {
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		login.username(),  
                		login.password() 
                )
        );
		
		
		return new Token(jwtService.generateToken(authentication));
	}
}
