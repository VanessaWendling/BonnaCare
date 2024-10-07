package com.ucp.tcc.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    private String interpretation;
    
    private boolean isAbnormal;

    public ConsultExam() {}

    public ConsultExam(Exam exam, String interpretation, boolean isAbnormal) {
        this.exam = exam;
        this.interpretation = interpretation;
        this.isAbnormal = isAbnormal;
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

	@Override
	public String toString() {
		return "ConsultExam [uuid=" + uuid + ", consult=" + consult + ", exam=" + exam + ", interpretation="
				+ interpretation + ", isAbnormal=" + isAbnormal + "]";
	}

}