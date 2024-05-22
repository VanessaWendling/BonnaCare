package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Dog {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String name;

	private Breeds breed;

	private Double weight;

	private Long age;

	@ManyToMany
	private Set<Person> keepers;

	public Dog() {

	}

	public Dog(UUID uuid, String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {
		super();
		this.uuid = uuid;
		this.name = name;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
		this.keepers = keepers;
	}
	public Dog(String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {
		this.name = name;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
		this.keepers = keepers;
	}

	public UUID getUuid() {
		return uuid;
	}

	public String getName() {
		return name;
	}

	public Breeds getBreed() {
		return breed;
	}

	public Double getWeight() {
		return weight;
	}

	public Long getAge() {
		return age;
	}

	public Set<Person> getKeepers() {
		return keepers;
	}

}
