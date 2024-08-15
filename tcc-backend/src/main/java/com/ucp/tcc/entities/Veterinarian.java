package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Veterinarian {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	private String name;
	
	private String crmv;
	
	private Specialization specialization;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "veterinarian_clinics", 
	    joinColumns = @JoinColumn(name = "veterinarian_uuid"), 
	    inverseJoinColumns = @JoinColumn(name = "clinic_uuid"))
	private Set<Clinic> clinics;

	
	
	public Veterinarian() {
	
	}
	
	public Veterinarian(UUID uuid, String name, String crmv, Specialization specialization, Set<Clinic> clinics) {
		this.uuid = uuid;
		this.name = name;
		this.crmv = crmv;
		this.specialization = specialization;
		this.clinics = clinics;
	}

	public Veterinarian(String name, String crmv, Specialization specialization, Set<Clinic> clinics) {
		this.name = name;
		this.crmv = crmv;
		this.specialization = specialization;
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
