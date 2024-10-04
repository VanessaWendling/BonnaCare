
package com.ucp.tcc.entities;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Dog {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String name;

	@Column(columnDefinition = "TEXT")
	private String photo;
	
	private String microchip;

	private Breeds breed;

	@Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date birthday;

	@ManyToMany
	@JsonBackReference
	private Set<Person> keepers;

	@OneToMany(mappedBy = "dog")
	private Set<Consult> consults;

	@Embedded
	private PetLocalization petLocalization;
	
	public Dog() {

	}

	public Dog(UUID uuid) {
		this.uuid = uuid;
	}

	public Dog(UUID uuid, String name, String photo, String microchip, Breeds breed, Date birthday, Set<Person> keepers,
			Set<Consult> consults) {
		this.uuid = uuid;
		this.name = name;
		this.photo = photo;
		this.microchip = microchip;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
		this.consults = consults;
	}

	public Dog(String name, String photo, String microchip, Breeds breed, Date birthday, Set<Person> keepers, PetLocalization petLocalization) {
		this.name = name;
		this.photo = photo;
		this.microchip = microchip;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
		this.petLocalization = petLocalization;
	}

	public Dog(UUID uuid, String name, String photo, Breeds breed, Date birthday, Set<Person> keepers) {
		this.uuid = uuid;
		this.name = name;
		this.photo = photo;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
	}
	
	public Dog(UUID uuid, PetLocalization petLocalization) {
		this.uuid = uuid;
		this.petLocalization = petLocalization;
	}

	public PetLocalization getPetLocalization() {
		return petLocalization;
	}

	public void setPetLocalization(PetLocalization petLocalization) {
		this.petLocalization = petLocalization;
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
	
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
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

}
