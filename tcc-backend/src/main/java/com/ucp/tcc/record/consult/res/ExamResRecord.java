package com.ucp.tcc.record.consult.res;

import java.util.UUID;

import com.ucp.tcc.entities.Exam;

public record ExamResRecord(UUID uuid, Exam exam, String interpretation, boolean isAbnormal, String file) {

}
