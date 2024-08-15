package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class MedicalHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	@OneToMany
	private Set<Consult> consults;
	
	public MedicalHistory() {
	
	}

	public MedicalHistory(UUID uuid, Set<Consult> consults) {
		this.uuid = uuid;
		this.consults = consults;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public Set<Consult> getConsults() {
		return consults;
	}

	public void setConsults(Set<Consult> consults) {
		this.consults = consults;
	}
	
}
