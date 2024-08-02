package com.ucp.tcc.dto.person;

import com.ucp.tcc.entities.Address;

public record PersonReqRecord(String name, String email, String password, String phone, Address address) {

}
