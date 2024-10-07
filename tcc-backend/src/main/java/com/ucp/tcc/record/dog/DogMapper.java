package com.ucp.tcc.record.dog;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.ucp.tcc.entities.Consult;
import com.ucp.tcc.entities.ConsultExam;
import com.ucp.tcc.entities.Dog;
import com.ucp.tcc.entities.Person;
import com.ucp.tcc.entities.PetLocalization;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.record.clinic.ClinicMapper;
import com.ucp.tcc.record.consult.res.ConsultResRecord;
import com.ucp.tcc.record.consult.res.ExamResRecord;
import com.ucp.tcc.record.consult.res.VaccineResRecord;
import com.ucp.tcc.record.dog.req.DogReqRecord;
import com.ucp.tcc.record.dog.res.DogResHistoricRecord;
import com.ucp.tcc.record.dog.res.DogResRecord;
import com.ucp.tcc.record.person.res.PersonResRecord;
import com.ucp.tcc.record.veterinarian.VetMapper;

public class DogMapper {

	public static Dog fromRecord(DogReqRecord reqRecord) {
		return new Dog(reqRecord.name(), reqRecord.photo(), reqRecord.microchip(), reqRecord.breed(),
				reqRecord.birthday(), reqRecord.setOfPeopleDetails(reqRecord.keepers()),
				new PetLocalization(reqRecord.localizator()));
	}

	public static DogResRecord fromEntity(Dog dog) {
		return new DogResRecord(dog.getUuid(), dog.getName(), dog.getMicrochip(), dog.getBreed(), dog.getBirthday(),
				setOfPeopleDetailsRecord(dog.getKeepers()), dog.getPetLocalization(), dog.getPhoto());
	}

	public static DogResHistoricRecord fromEntityHistoricRecord(Dog dog) {
		return new DogResHistoricRecord(dog.getUuid(), transformConsult(dog.getConsults()));
	}

	private static List<ConsultResRecord> transformConsult(List<Consult> consults) {
		return consults.stream()
				.map(consult -> new ConsultResRecord(consult.getUuid(), consult.getDate(), consult.getReason(),
						consult.getObservations(), consult.getTreatmentPlan(), consult.getConsultType(),
						consult.getWeight(), transformVaccines(consult.getVaccines()),
						transformExam(consult.getConsultExams()), VetMapper.fromSimpleEntity(consult.getVet()),
						ClinicMapper.fromEntitySimple(consult.getClinic()))).toList();
	}

	private static Set<VaccineResRecord> transformVaccines(Set<Vaccine> vaccines) {
		return vaccines.stream()
				.map(vaccine -> new VaccineResRecord(vaccine.getUuid(), vaccine.getName(), vaccine.getDescription()))
				.collect(Collectors.toSet());
	}

	private static Set<ExamResRecord> transformExam(Set<ConsultExam> exams) {
		return exams.stream().map(
				exam -> new ExamResRecord(exam.getUuid(), exam.getExam(), exam.getInterpretation(), exam.isAbnormal()))
				.collect(Collectors.toSet());
	}

	private static Set<PersonResRecord> setOfPeopleDetailsRecord(Set<Person> people) {
		return people.stream().map(person -> new PersonResRecord(person.getUuid(), person.getName(), person.getEmail(),
				person.getPhone(), person.getAddress())).collect(Collectors.toSet());
	}
}
