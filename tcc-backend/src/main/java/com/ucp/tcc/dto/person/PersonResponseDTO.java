package com.ucp.tcc.dto.person;

import java.util.UUID;

import com.ucp.tcc.entities.Address;

public class PersonResponseDTO {
	private UUID uuid;
	private String name;
	private String email;
	private String phone;
	private Address address;
	
	public PersonResponseDTO() {
		// TODO Auto-generated constructor stub
	}

	public PersonResponseDTO(UUID uuid, String name, String email, String phone, Address address) {
		super();
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
}
