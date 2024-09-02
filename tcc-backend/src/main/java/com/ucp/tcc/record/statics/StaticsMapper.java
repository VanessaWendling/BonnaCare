package com.ucp.tcc.record.statics;

import com.ucp.tcc.entities.Exam;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.record.statics.res.ExamResRecord;
import com.ucp.tcc.record.statics.res.VaccineResRecord;

public class StaticsMapper {

	public static ExamResRecord fromExamEntity(Exam exam) {
		return new ExamResRecord(exam.getUuid(), exam.getName(), exam.getDescription());
	}

	public static VaccineResRecord fromVaccineEntity(Vaccine vaccine) {
		return new VaccineResRecord(vaccine.getUuid(), vaccine.getName(), vaccine.getDescription());
	}
}
