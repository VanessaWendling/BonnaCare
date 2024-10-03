package com.ucp.tcc.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Exam;
import com.ucp.tcc.repositories.ExamRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ExamService {

	@Autowired
	private ExamRepository examRepository;
	
	public Exam save(Exam exam) {
		return examRepository.save(exam);
	}
	
	public List<Exam> getAll(){
		return examRepository.findAll();
	}
	
	public Exam findByUUID(UUID uuid) {
		return examRepository.findById(uuid).orElseThrow(() -> new EntityNotFoundException("Exam not found in the system"));
	}

}
