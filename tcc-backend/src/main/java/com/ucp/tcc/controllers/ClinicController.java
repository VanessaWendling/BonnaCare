package com.ucp.tcc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.clinic.ClinicMapper;
import com.ucp.tcc.record.clinic.req.ClinicReqRecord;
import com.ucp.tcc.record.clinic.res.ClinicResRecord;
import com.ucp.tcc.services.ClinicService;

@RestController
@RequestMapping("/clinic")
public class ClinicController {

	@Autowired
	private ClinicService clinicService;
	
	@GetMapping()
	private ResponseEntity<List<ClinicResRecord>> getAllClinic(){
		return ResponseEntity.status(HttpStatus.OK)
				.body(clinicService.getClinics().stream().map(ClinicMapper::fromEntity).toList());
	}
	
	@PostMapping()
	private ResponseEntity<ClinicResRecord> createClinic(@RequestBody ClinicReqRecord reqRecord){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ClinicMapper.fromEntity(clinicService.insertClinic(reqRecord)));
	}
}
