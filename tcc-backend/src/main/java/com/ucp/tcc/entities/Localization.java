package com.ucp.tcc.entities;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Localization {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	private String localizator;
	private Double longitude;
	private Double latitude;

	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private Date date;
	
	public Localization() {
	
	}

	public Localization(UUID uuid, String localizator, Double latitude, Double longitude, Date date) {
		this.uuid = uuid;
		this.localizator = localizator;
		this.longitude = longitude;
		this.latitude = latitude;
		this.date = date;
	}

	public Localization(String localizator, Double latitude, Double longitude) {
		this.localizator = localizator;
		this.longitude = longitude;
		this.latitude = latitude;
		this.date = new Date();
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public String getLocalizator() {
		return localizator;
	}

	public void setLocalizator(String localizator) {
		this.localizator = localizator;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
