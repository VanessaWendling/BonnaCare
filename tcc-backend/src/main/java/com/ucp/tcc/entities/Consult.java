package com.ucp.tcc.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Consult {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;
	
	private Date date;
	
	@OneToMany
	private List<Vaccine> vaccines;
	
	@OneToMany
	private List<Exam> exams;
	
	@OneToOne
	private Veterinarian vet;
	
	@OneToOne
	private Clinic clinc;
	
	public Consult() {
	
	}

	public Consult(UUID uuid, Date date, List<Vaccine> vaccines, List<Exam> exams, Veterinarian vet, Clinic clinc) {
		this.uuid = uuid;
		this.date = date;
		this.vaccines = vaccines;
		this.exams = exams;
		this.vet = vet;
		this.clinc = clinc;
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

	public List<Vaccine> getVaccines() {
		return vaccines;
	}

	public void setVaccines(List<Vaccine> vaccines) {
		this.vaccines = vaccines;
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}

	public Veterinarian getVet() {
		return vet;
	}

	public void setVet(Veterinarian vet) {
		this.vet = vet;
	}

	public Clinic getClinc() {
		return clinc;
	}

	public void setClinc(Clinic clinc) {
		this.clinc = clinc;
	}
		
}
