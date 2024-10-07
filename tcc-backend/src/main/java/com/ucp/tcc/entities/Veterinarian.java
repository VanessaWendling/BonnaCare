package com.ucp.tcc.entities;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Veterinarian implements AuthenticatedUser{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String name;

	private String email;

	private String password;

	private String crmv;

	private Specialization specialization;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "veterinarian_clinics", joinColumns = @JoinColumn(name = "veterinarian_uuid"), inverseJoinColumns = @JoinColumn(name = "clinic_uuid"))
	@JsonManagedReference
	private Set<Clinic> clinics = new HashSet<>();

	@OneToMany(mappedBy = "vet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Consult> consults = new HashSet<>();

	public Veterinarian() {

	}

	public Veterinarian(UUID uuid, String name, String email, String crmv, Specialization specialization, String password,
			Set<Clinic> clinics) {
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.crmv = crmv;
		this.specialization = specialization;
		this.password = password;
		this.clinics = clinics;
	}

	public Veterinarian(String name, String email, String crmv, Specialization specialization, String password, Set<Clinic> clinics) {
		this.name = name;
		this.email = email;
		this.crmv = crmv;
		this.specialization = specialization;
		this.password = password;
		this.clinics = clinics;
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

	@Override
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCrmv() {
		return crmv;
	}

	public void setCrmv(String crmv) {
		this.crmv = crmv;
	}

	public Specialization getSpecialization() {
		return specialization;
	}

	public void setSpecialization(Specialization specialization) {
		this.specialization = specialization;
	}

	public Set<Clinic> getClinics() {
		return clinics;
	}

	public void setClinics(Set<Clinic> clinics) {
		this.clinics = clinics;
	}
}
