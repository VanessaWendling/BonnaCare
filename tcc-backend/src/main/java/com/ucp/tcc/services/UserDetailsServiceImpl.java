package com.ucp.tcc.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Keeper;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.repositories.KeeperRepository;
import com.ucp.tcc.repositories.VeterinarianRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final KeeperRepository personRepository;

	private final VeterinarianRepository veterinarianRepository;

	public UserDetailsServiceImpl(KeeperRepository personRepository, VeterinarianRepository veterinarianRepository) {
		this.personRepository = personRepository;
		this.veterinarianRepository = veterinarianRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Keeper person = personRepository.findByEmail(email).orElse(null);

		Veterinarian veterinarian = null;
		if (person == null) {
			veterinarian = veterinarianRepository.findByEmail(email).orElse(null);
		}

		if (person == null && veterinarian == null) {
			throw new UsernameNotFoundException("User not found");
		}

		if (person != null) {
			return new UserAuthenticated(person); // Para Person
		} else {
			return new UserAuthenticated(veterinarian); // Para Veterinarian
		}
		
//		return personRepository.findByEmail(email).map(user -> new UserAuthenticated(user))
//				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
	}
}
