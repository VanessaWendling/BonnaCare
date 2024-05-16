package com.ucp.tcc.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	private String name;

	public Person(UUID uuid, String name) {
		super();
		this.uuid = uuid;
		this.name = name;
	}
		
	public Person() {

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
	

}
