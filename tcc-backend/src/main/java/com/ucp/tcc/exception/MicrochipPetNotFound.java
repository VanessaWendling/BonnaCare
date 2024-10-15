package com.ucp.tcc.exception;

public class MicrochipPetNotFound extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public MicrochipPetNotFound(String message) {
        super(message);
    }
}
