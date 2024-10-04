package com.ucp.tcc.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class PetLocalization {

	private String localizator;

	private Double latitudeRef;

	private Double longitudeRef;

	public PetLocalization(String localizator, Double latitudeRef, Double longitudeRef) {
		this.localizator = localizator;
		this.latitudeRef = latitudeRef;
		this.longitudeRef = longitudeRef;
	}

	public PetLocalization() {
    }
	
	public PetLocalization(String localizator) {
		this.localizator = localizator;
	}

	public String getLocalizator() {
		return localizator;
	}

	public void setLocalizator(String localizator) {
		this.localizator = localizator;
	}

	public Double getLatitudeRef() {
		return latitudeRef;
	}

	public void setLatitudeRef(Double latitudeRef) {
		this.latitudeRef = latitudeRef;
	}

	public Double getLongitudeRef() {
		return longitudeRef;
	}

	public void setLongitudeRef(Double longitudeRef) {
		this.longitudeRef = longitudeRef;
	}

}
