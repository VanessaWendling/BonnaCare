package com.ucp.tcc.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {

	private String postalCode;
	private String city;
	private String locale;
	private String neighborhood;
	private String number;

	public Address() {

	}

	public Address(String postalCode, String city, String locale, String neighborhood, String number) {
		super();
		this.postalCode = postalCode;
		this.city = city;
		this.locale = locale;
		this.neighborhood = neighborhood;
		this.number = number;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public String getCity() {
		return city;
	}

	public String getLocale() {
		return locale;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public String getNumber() {
		return number;
	}

}
