package com.ucp.tcc.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucp.tcc.record.statics.StaticsMapper;
import com.ucp.tcc.record.statics.res.ExamResRecord;
import com.ucp.tcc.services.ExamService;

@RestController
@RequestMapping("/exams")
public class ExamController {

	@Autowired
	private ExamService examService;

	@GetMapping()
	public ResponseEntity<Set<ExamResRecord>> listOfExams() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(examService.getAll().stream().map(StaticsMapper::fromExamEntity).collect(Collectors.toSet()));
	}
}
