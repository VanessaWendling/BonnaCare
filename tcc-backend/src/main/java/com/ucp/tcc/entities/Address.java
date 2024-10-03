package com.ucp.tcc.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {

	private String postalCode;
	private String city;
	private String locale;
	private String street;
	private String neighborhood;
	private String number;

	public Address() {

	}

	public Address(String postalCode, String city, String locale, String street, String neighborhood, String number) {
		super();
		this.postalCode = postalCode;
		this.city = city;
		this.locale = locale;
		this.street = street;
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

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public String getNumber() {
		return number;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public void setNumber(String number) {
		this.number = number;
	}

}
