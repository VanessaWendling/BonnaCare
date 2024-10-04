package com.ucp.tcc.record.loc;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public record LocalizationResRecord(String localizator, Double latitude, Double longitude,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss") Date date) {

}
