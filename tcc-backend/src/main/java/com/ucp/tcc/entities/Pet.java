
package com.ucp.tcc.entities;

import java.util.Date;
import java.util.List;
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
import jakarta.persistence.OrderBy;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Pet {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String name;

	@Column(columnDefinition = "TEXT")
	private String photo;

	@Column(unique = true)
	private String microchip;

	private Breeds breed;

	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private Date birthday;

	@ManyToMany
	@JsonBackReference
	private Set<Keeper> keepers;

	@OneToMany(mappedBy = "pet")
	@OrderBy("date DESC")
	private List<Consult> consults;

	@Embedded
	private PetLocalization petLocalization;

	public Pet() {

	}

	public Pet(UUID uuid) {
		this.uuid = uuid;
	}

	public Pet(UUID uuid, String name, String photo, String microchip, Breeds breed, Date birthday, Set<Keeper> keepers,
			List<Consult> consults) {
		this.uuid = uuid;
		this.name = name;
		this.photo = photo;
		this.microchip = microchip;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
		this.consults = consults;
	}

	public Pet(String name, String photo, String microchip, Breeds breed, Date birthday, Set<Keeper> keepers,
			PetLocalization petLocalization) {
		this.name = name;
		this.photo = photo;
		this.microchip = microchip;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
		this.petLocalization = petLocalization;
	}

	public Pet(UUID uuid, String name, String photo, Breeds breed, Date birthday, Set<Keeper> keepers) {
		this.uuid = uuid;
		this.name = name;
		this.photo = photo;
		this.breed = breed;
		this.birthday = birthday;
		this.keepers = keepers;
	}

	public Pet(UUID uuid, PetLocalization petLocalization) {
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

	public Set<Keeper> getKeepers() {
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

	public void setKeepers(Set<Keeper> keepers) {
		this.keepers = keepers;
	}

	public String getMicrochip() {
		return microchip;
	}

	public void setMicrochip(String microchip) {
		this.microchip = microchip;
	}

	public List<Consult> getConsults() {
		return consults;
	}

	public void setConsults(List<Consult> consults) {
		this.consults = consults;
	}

}
