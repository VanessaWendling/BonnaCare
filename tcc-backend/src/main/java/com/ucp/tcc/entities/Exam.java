package com.ucp.tcc.entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Exam {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	private String name;
	
	private Date date;
	
	private String observation;
	
	public Exam() {
	
	}

	public Exam(UUID uuid, String name, Date date, String observation) {
		this.uuid = uuid;
		this.name = name;
		this.date = date;
		this.observation = observation;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}
	
}
