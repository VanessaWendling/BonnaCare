package com.ucp.tcc.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ConsultExam {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID uuid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	private Consult consult;

	@ManyToOne(fetch = FetchType.LAZY)
	private Exam exam;

	@Column(columnDefinition = "TEXT")
	private String file;

	private String interpretation;

	private boolean isAbnormal;

	public ConsultExam() {
	}

	public ConsultExam(Exam exam, String interpretation, boolean isAbnormal, String file) {
		this.exam = exam;
		this.interpretation = interpretation;
		this.isAbnormal = isAbnormal;
		this.file = file;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setId(UUID uuid) {
		this.uuid = uuid;
	}

	public Consult getConsult() {
		return consult;
	}
	
	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public void setConsult(Consult consult) {
		this.consult = consult;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public String getInterpretation() {
		return interpretation;
	}

	public void setInterpretation(String interpretation) {
		this.interpretation = interpretation;
	}

	public boolean isAbnormal() {
		return isAbnormal;
	}

	public void setAbnormal(boolean isAbnormal) {
		this.isAbnormal = isAbnormal;
	}
}