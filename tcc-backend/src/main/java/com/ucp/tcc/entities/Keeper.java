package com.ucp.tcc.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;

@Entity
public class Keeper extends Person {
	
	@ManyToOne(targetEntity=Dog.class, fetch=FetchType.LAZY)
	private Set<Dog> dogs;
	
	public Keeper() {
	
	}
	
	public Set<Dog> getDogs() {
		return dogs;
	}

	public Keeper(UUID uuid, String name, Set<Dog> dogs) {
		super(uuid, name);
		this.dogs = dogs;
	}


}
