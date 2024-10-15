package com.ucp.tcc.services;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ucp.tcc.entities.AuthenticatedUser;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.entities.Veterinarian;

public class UserAuthenticated implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private final AuthenticatedUser authenticatedUser;

	public UserAuthenticated(AuthenticatedUser authenticatedUser) {
		this.authenticatedUser = authenticatedUser;
	}

//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		return List.of(() -> "ROLE_USER");
//	}
	
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (authenticatedUser instanceof Person) {
            return List.of(() -> "ROLE_USER"); // Para Person
        } else if (authenticatedUser instanceof Veterinarian) {
            return List.of(() -> "ROLE_VETERINARIAN"); // Para Veterinarian
        }
        return List.of(); // Nenhuma autoridade se nenhum usuário conhecido
    }

	@Override
	public String getPassword() {
		return authenticatedUser.getPassword();
	}

	@Override
	public String getUsername() {
		return authenticatedUser.getEmail();
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
