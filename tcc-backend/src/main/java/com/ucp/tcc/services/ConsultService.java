package com.ucp.tcc.services;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Consult;
import com.ucp.tcc.entities.ConsultExam;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Exam;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.entities.Veterinarian;
import com.ucp.tcc.record.consult.req.ConsultReqRecord;
import com.ucp.tcc.record.consult.req.ExamResultReqRecord;
import com.ucp.tcc.repositories.ConsultExamRepository;
import com.ucp.tcc.repositories.ConsultRepository;

@Service
public class ConsultService {

	@Autowired
	private ConsultRepository consultRepository;

	@Autowired
	private VeterinarianService veterinarianService;

	@Autowired
	private DogService dogService;

	@Autowired
	private ClinicService clinicService;

	@Autowired
	private VaccineService vaccineService;

	@Autowired
	private ExamService examService;

	@Autowired
	private ConsultExamRepository consultExamRepository;

	public Consult createConsult(ConsultReqRecord reqRecord) {

		Clinic clinic = clinicService.findByUUID(reqRecord.clinic());
		Veterinarian vet = veterinarianService.findByUUID(reqRecord.vet());
		Dog dog = dogService.findDogByUUID(reqRecord.dog());
		Set<Vaccine> vaccines = findConsultVaccinesByUUID(reqRecord.vaccines());

		Consult consult = new Consult(reqRecord.date(), reqRecord.reason(), reqRecord.observations(),
				reqRecord.treatmentPlan(), reqRecord.consultType(), reqRecord.weight(), vaccines,
				Collections.emptySet(), vet, clinic, dog);
		consult = consultRepository.save(consult);

		Set<ConsultExam> consultExams = new HashSet<>();
		for (ExamResultReqRecord examRecord : reqRecord.exams()) {
			ConsultExam consultExam = parseDataConsultExam(examRecord, consult);
			consultExams.add(consultExam);
		}

		// Salva os ConsultExams no banco
		consultExamRepository.saveAll(consultExams);

		// Atualiza a consulta com os exames
		consult.setConsultExams(consultExams);
		consult = consultRepository.save(consult); // Atualiza a consulta com os exames

		return consult;

	}

	private Set<Vaccine> findConsultVaccinesByUUID(Set<UUID> uuids) {
		return uuids.stream().map(vaccineService::findByUUID).collect(Collectors.toSet());
	}

	private ConsultExam parseDataConsultExam(ExamResultReqRecord examRecord, Consult consult) {
		Exam exam = examService.findByUUID(examRecord.exam());

		ConsultExam consultExam = new ConsultExam();
		consultExam.setConsult(consult);
		consultExam.setExam(exam);
		consultExam.setInterpretation(examRecord.interpretation());
		consultExam.setAbnormal(examRecord.isAbnormal());
		consultExam.setFile(examRecord.file());

		return consultExam;
	}

	public List<Consult> getAll() {
		return consultRepository.findAll();
	}

}
