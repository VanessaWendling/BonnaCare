package com.ucp.tcc.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ucp.tcc.repositories.PersonRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final PersonRepository personRepository;
	
	public UserDetailsServiceImpl(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		return personRepository.findByEmail(email)
        .map(user -> new UserAuthenticated(user))
        .orElseThrow(
            () -> new UsernameNotFoundException("User Not Found with email: " + email));

  }
}
