
package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Dog {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String name;

	private String microchip;

	private Breeds breed;

	private Double weight;

	private Long age;

	@ManyToMany
	private Set<Person> keepers;

	@OneToMany(mappedBy = "dog")
	private Set<Consult> consults;

	
	private String localizationId;
	
	public Dog() {

	}

	public Dog(UUID uuid) {
		this.uuid = uuid;
	}

	public Dog(UUID uuid, String name, String microchip, Breeds breed, Double weight, Long age, Set<Person> keepers,
			Set<Consult> consults) {
		this.uuid = uuid;
		this.name = name;
		this.microchip = microchip;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
		this.keepers = keepers;
		this.consults = consults;
	}

	public Dog(String name, String microchip, Breeds breed, Double weight, Long age, Set<Person> keepers) {
		this.name = name;
		this.microchip = microchip;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
		this.keepers = keepers;
	}

	public Dog(UUID uuid, String name, Breeds breed, Double weight, Long age, Set<Person> keepers) {
		this.uuid = uuid;
		this.name = name;
		this.breed = breed;
		this.weight = weight;
		this.age = age;
		this.keepers = keepers;
	}
	
	public Dog(UUID uuid, String localizationId) {
		this.uuid = uuid;
		this.localizationId = localizationId;
	}

	public String getLocalizationId() {
		return localizationId;
	}

	public void setLocalizationId(String localizationId) {
		this.localizationId = localizationId;
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

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setBreed(Breeds breed) {
		this.breed = breed;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public void setKeepers(Set<Person> keepers) {
		this.keepers = keepers;
	}

	public String getMicrochip() {
		return microchip;
	}

	public void setMicrochip(String microchip) {
		this.microchip = microchip;
	}

	public Set<Consult> getConsults() {
		return consults;
	}

	public void setConsults(Set<Consult> consults) {
		this.consults = consults;
	}

	@Override
	public String toString() {
		return "uuid=" + uuid + "\n name=" + name + "\n  breed=" + breed + "\n  weight=" + weight + "\n  age=" + age
				+ "\n  keepers=" + keepers + "\n \n ";
	}

}
