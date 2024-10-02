package com.ucp.tcc.exception;

import java.io.Serial;

import org.springframework.security.core.AuthenticationException;

public class AuthenticationErrorException extends AuthenticationException {

	@Serial
	private static final long serialVersionUID = 1L;
	
	public AuthenticationErrorException(String msg) {
		super(msg);
	}

}
