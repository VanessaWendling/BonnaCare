package com.ucp.tcc.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ucp.tcc.record.auth.Login;
import com.ucp.tcc.record.auth.Token;
import com.ucp.tcc.repositories.PersonRepository;
import com.ucp.tcc.repositories.VeterinarianRepository;

@Service
public class AuthenticationService {

	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final PersonRepository personRepository;
	private final VeterinarianRepository veterinarianRepository;

	public AuthenticationService(JwtService jwtService, AuthenticationManager authenticationManager,
			PersonRepository personRepository, VeterinarianRepository veterinarianRepository) {
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
		this.personRepository = personRepository;
		this.veterinarianRepository = veterinarianRepository;

	};

	public Token authenticate(Login login) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(login.username(), login.password()));

		String userUuid = personRepository.findByEmail(login.username()).map(person -> person.getUuid().toString())
				.orElseGet(() -> veterinarianRepository.findByEmail(login.username())
						.map(vet -> vet.getUuid().toString())
						.orElseThrow(() -> new UsernameNotFoundException(
								"Usuário não encontrado com o email: " + login.username())));

		return new Token(jwtService.generateToken(authentication), userUuid);
	}
}
