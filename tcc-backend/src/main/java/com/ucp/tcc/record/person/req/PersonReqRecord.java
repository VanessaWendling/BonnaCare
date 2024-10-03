package com.ucp.tcc.record.person.req;

import com.ucp.tcc.entities.Address;

public record PersonReqRecord(String name, String photo, String email, String password, String phone, Address address) {

}
