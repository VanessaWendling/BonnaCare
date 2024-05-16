package com.ucp.tcc.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Dog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID )
	private UUID uuid;
	
	private String name;
	
	private Breeds breed;
	
	private Double weight;
	
	private Long age;

	public Dog(UUID uuid, String name, Breeds breed, Double weight, Long age) {
		super();
		this.uuid = uuid;
		this.name = name;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
	}

	public Dog() {
		
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

	public Breeds getBreed() {
		return breed;
	}

	public void setBreed(Breeds breed) {
		this.breed = breed;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

		
}
