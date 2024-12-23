package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Keeper implements AuthenticatedUser{

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	private String name;
	@Column(columnDefinition = "TEXT")
	private String photo;
	private String email;
	private String password;
	private String phone;
	@Embedded
	private Address address;

	@ManyToMany(fetch = FetchType.EAGER)
	@JsonManagedReference
	@JoinTable(name = "pet_keepers",
	joinColumns = @JoinColumn(name = "keepers_uuid"),
	inverseJoinColumns = @JoinColumn(name = "pet_uuid"))
	private Set<Pet> pets;

	public Keeper(UUID uuid, String name, String photo, String email, String password, String phone, Address address, Set<Pet> pets) {
		this.uuid = uuid;
		this.name = name;
		this.phone = photo;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address = address;
		this.pets = pets;
	}

	public Keeper(String name, String photo, String email, String password, String phone, Address address) {
		this.name = name;
		this.photo = photo;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address = address;
	}

	public Keeper() {

	}

	public Keeper(UUID uuid) {
		this.uuid = uuid;
	}

	public UUID getUuid() {
		return uuid;
	}

	public String getName() {
		return name;
	}

	@Override
	public String getEmail() {
		return email;
	}
	
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public String getPhone() {
		return phone;
	}

	public Set<Pet> getPets() {
		return pets;
	}

	public Address getAddress() {
		return address;
	}

	@Override
	public String toString() {
		return "Keeper [uuid=" + uuid + ", name=" + name + ", email=" + email + ", password=" + password + ", phone="
				+ phone + ", address=" + address + ", pets=" + pets + "]";
	}
}
