package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	private String name;
	private String email;
	private String password;
	private String phone;
	@Embedded
	private Address address;

	@ManyToMany
	private Set<Dog> dogs;

	public Person(UUID uuid, String name, String email, String password, String phone, Address address, Set<Dog> dogs) {
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address = address;
		this.dogs = dogs;
	}

	public Person(String name, String email, String password, String phone, Address address) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address = address;
	}

	public Person() {

	}

	public Person(UUID uuid) {
		this.uuid = uuid;
	}

	public UUID getUuid() {
		return uuid;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getPhone() {
		return phone;
	}

	public Set<Dog> getDogs() {
		return dogs;
	}

	public Address getAddress() {
		return address;
	}
}
