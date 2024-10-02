package com.ucp.tcc.services;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ucp.tcc.entities.Person;

public class UserAuthenticated implements UserDetails {

	private final Person person;

	public UserAuthenticated(Person person) {
		this.person = person;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(() -> "ROLE_USER");
	}

	@Override
	public String getPassword() {
		return person.getPassword();
	}

	@Override
	public String getUsername() {
		return person.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
