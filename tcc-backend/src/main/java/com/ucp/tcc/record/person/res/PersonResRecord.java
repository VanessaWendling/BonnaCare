package com.ucp.tcc.record.person.res;

import java.util.UUID;

import com.ucp.tcc.entities.Address;

public record PersonResRecord(UUID uuid, String name, String email, String phone, Address address) {
	
}
