package com.ucp.tcc.entities;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Clinic {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	private String name;
	
	private String phone;
	
	private Address address;
	
	@ManyToMany(mappedBy = "clinics")
    private Set<Veterinarian> veterinarians = new HashSet<>();

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    private Set<Consult> consults = new HashSet<>();
	
	public Clinic() {
	
	}

	public Clinic(UUID uuid, String name, String phone, Address address, Set<Veterinarian> veterinarians) {
		this.uuid = uuid;
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.veterinarians = veterinarians;
	}
	
	public Clinic(UUID uuid) {
		this.uuid = uuid;
	}

	public Clinic(String name, String phone, Address address) {
		this.name = name;
		this.phone = phone;
		this.address = address;
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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Set<Veterinarian> getVeterinarians() {
		return veterinarians;
	}

	public void setVeterinarias(Set<Veterinarian> veterinarians) {
		this.veterinarians = veterinarians;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setVeterinarians(Set<Veterinarian> veterinarians) {
		this.veterinarians = veterinarians;
	}

	@Override
	public String toString() {
		return "Clinic [uuid=" + uuid + ", name=" + name + ", phone=" + phone + ", address=" + address
				+ ", veterinarians=" + veterinarians + "]";
	}
	
}
