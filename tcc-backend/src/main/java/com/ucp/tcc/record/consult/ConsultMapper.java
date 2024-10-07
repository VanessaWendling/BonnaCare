package com.ucp.tcc.record.consult;

import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Consult;
import com.ucp.tcc.entities.ConsultExam;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.record.clinic.ClinicMapper;
import com.ucp.tcc.record.consult.res.ConsultResRecord;
import com.ucp.tcc.record.consult.res.ExamResRecord;
import com.ucp.tcc.record.consult.res.VaccineResRecord;
import com.ucp.tcc.record.veterinarian.VetMapper;

public class ConsultMapper {

	public static ConsultResRecord fromEntity(Consult consult) {
		return new ConsultResRecord(consult.getUuid(), consult.getDate(), consult.getReason(),
				consult.getObservations(), consult.getTreatmentPlan(), consult.getConsultType(), consult.getWeight(),
				fromVaccineEntity(consult.getVaccines()), fromExamEntity(consult.getConsultExams()),
				VetMapper.fromSimpleEntity(consult.getVet()), ClinicMapper.fromEntitySimple(consult.getClinic()));
	}

	private static Set<VaccineResRecord> fromVaccineEntity(Set<Vaccine> vaccines) {
		return vaccines.stream().map(v -> new VaccineResRecord(v.getUuid(), v.getName(), v.getDescription()))
				.collect(Collectors.toSet());
	}

	private static Set<ExamResRecord> fromExamEntity(Set<ConsultExam> exams) {
		return exams.stream()
				.map(e -> new ExamResRecord(e.getUuid(), e.getExam(), e.getInterpretation(), e.isAbnormal()))
				.collect(Collectors.toSet());
	}
}
