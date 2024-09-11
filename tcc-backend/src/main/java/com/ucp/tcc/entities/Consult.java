package com.ucp.tcc.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Consult {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private Date date;

	@OneToMany(cascade = CascadeType.ALL)
	private Set<Vaccine> vaccines =  new HashSet<>();

	@OneToMany(mappedBy = "consult", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ConsultExam> consultExams;

	@OneToOne
	private Veterinarian vet;

	@OneToOne
	private Clinic clinic;

	@ManyToOne(fetch = FetchType.LAZY)
	private Dog dog;

	public Consult() {

	}

	public Consult(UUID uuid, Date date, Set<Vaccine> vaccines, Set<ConsultExam> consultExams, Veterinarian vet, Clinic clinic,
			Dog dog) {
		this.uuid = uuid;
		this.date = date;
		this.vaccines = vaccines;
		this.consultExams = consultExams;
		this.vet = vet;
		this.clinic = clinic;
		this.dog = dog;
	}

	public Consult(Date date, Set<Vaccine> vaccines, Set<ConsultExam> consultExams, Veterinarian vet, Clinic clinic, Dog dog) {
		this.date = date;
		this.vaccines = vaccines;
		this.consultExams = consultExams;
		this.vet = vet;
		this.clinic = clinic;
		this.dog = dog;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Set<Vaccine> getVaccines() {
		return vaccines;
	}

	public void setVaccines(Set<Vaccine> vaccines) {
		this.vaccines = vaccines;
	}

	public Set<ConsultExam> getExams() {
		return consultExams;
	}

	public void setExams(Set<ConsultExam> consultExams) {
		this.consultExams = consultExams;
	}

	public Veterinarian getVet() {
		return vet;
	}

	public void setVet(Veterinarian vet) {
		this.vet = vet;
	}

	public Clinic getClinic() {
		return clinic;
	}

	public void setClinc(Clinic clinic) {
		this.clinic = clinic;
	}

	public Dog getDog() {
		return dog;
	}

	public void setDog(Dog dog) {
		this.dog = dog;
	}

	public void setClinic(Clinic clinic) {
		this.clinic = clinic;
	}

}
