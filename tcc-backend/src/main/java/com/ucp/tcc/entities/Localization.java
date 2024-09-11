package com.ucp.tcc.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Localization {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	private String localizationId;
	private Long longitude;
	private Long latitude;
	
	public Localization(UUID uuid, String name, String localizationId, Long longitude, Long latitude) {
		this.uuid = uuid;
		this.localizationId = localizationId;
		this.longitude = longitude;
		this.latitude = latitude;
	}

	public Localization(UUID uuid, String localizationId) {
		this.uuid = uuid;
		this.localizationId = localizationId;
	}

	public String getString() {
		return localizationId;
	}

	public void setName(String localizationId) {
		this.localizationId = localizationId;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public String getLocalizationId() {
		return localizationId;
	}

	public void setLocalizationId(String localizationId) {
		this.localizationId = localizationId;
	}

	public Long getLongitude() {
		return longitude;
	}

	public void setLongitude(Long longitude) {
		this.longitude = longitude;
	}

	public Long getLatitude() {
		return latitude;
	}

	public void setLatitude(Long latitude) {
		this.latitude = latitude;
	}
	
}
