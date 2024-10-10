package com.ucp.tcc.record.consult.req;

import java.util.UUID;

public record ExamResultReqRecord(UUID exam, UUID consult, String interpretation, boolean isAbnormal, String file) {

}
