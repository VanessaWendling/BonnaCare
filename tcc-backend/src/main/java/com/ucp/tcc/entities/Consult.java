package com.ucp.tcc.entities;

import java.util.Date;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.UniqueConstraint;

@Entity
public class Consult {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private Date date;

	@Column(length = 500)
	private String reason;

	@Column(length = 500)
	private String observations;

	@Column(length = 500)
	private String treatmentPlan;

	private ConsultType consultType;

	private Double weight;

	@ManyToMany
	@JoinTable(name = "consult_vaccines", joinColumns = @JoinColumn(name = "consult_uuid"), inverseJoinColumns = @JoinColumn(name = "vaccines_uuid"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"consult_uuid", "vaccines_uuid" }))
	private Set<Vaccine> vaccines;

	@OneToMany(mappedBy = "consult", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private Set<ConsultExam> consultExams;

	@ManyToOne(fetch = FetchType.LAZY)
	private Veterinarian vet;

	@ManyToOne(fetch = FetchType.LAZY)
	private Clinic clinic;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Pet pet;

	public Consult() {

	}

	public Consult(UUID uuid, Date date, String reason, String observations, String treatmentPlan,
			ConsultType consultType, Double weight, Set<Vaccine> vaccines, Set<ConsultExam> consultExams,
			Veterinarian vet, Clinic clinic, Pet pet) {
		this.uuid = uuid;
		this.date = date;
		this.reason = reason;
		this.observations = observations;
		this.treatmentPlan = treatmentPlan;
		this.consultType = consultType;
		this.weight = weight;
		this.vaccines = vaccines;
		this.consultExams = consultExams;
		this.vet = vet;
		this.clinic = clinic;
		this.pet = pet;
	}

	public Consult(Date date, String reason, String observations, String treatmentPlan, ConsultType consultType,
			Double weight, Set<Vaccine> vaccines, Set<ConsultExam> consultExams, Veterinarian vet, Clinic clinic,
			Pet pet) {
		this.date = date;
		this.reason = reason;
		this.observations = observations;
		this.treatmentPlan = treatmentPlan;
		this.consultType = consultType;
		this.weight = weight;
		this.vaccines = vaccines;
		this.consultExams = consultExams;
		this.vet = vet;
		this.clinic = clinic;
		this.pet = pet;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public String getTreatmentPlan() {
		return treatmentPlan;
	}

	public void setTreatmentPlan(String treatmentPlan) {
		this.treatmentPlan = treatmentPlan;
	}

	public ConsultType getConsultType() {
		return consultType;
	}

	public void setConsultType(ConsultType consultType) {
		this.consultType = consultType;
	}

	public Consult(UUID uuid) {
		this.uuid = uuid;
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

	public Set<ConsultExam> getConsultExams() {
		return consultExams;
	}

	public void setConsultExams(Set<ConsultExam> consultExams) {
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

	public Pet getPet() {
		return pet;
	}

	public void setPet(Pet pet) {
		this.pet = pet;
	}

	public void setClinic(Clinic clinic) {
		this.clinic = clinic;
	}

	@Override
	public int hashCode() {
		return Objects.hash(clinic, consultExams, consultType, date, pet, observations, reason, treatmentPlan, uuid,
				vaccines, vet);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Consult other = (Consult) obj;
		return Objects.equals(clinic, other.clinic) && Objects.equals(consultExams, other.consultExams)
				&& consultType == other.consultType && Objects.equals(date, other.date)
				&& Objects.equals(pet, other.pet) && Objects.equals(observations, other.observations)
				&& Objects.equals(reason, other.reason) && Objects.equals(treatmentPlan, other.treatmentPlan)
				&& Objects.equals(uuid, other.uuid) && Objects.equals(vaccines, other.vaccines)
				&& Objects.equals(vet, other.vet);
	}
}
