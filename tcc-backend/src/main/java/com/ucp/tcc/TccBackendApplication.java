package com.ucp.tcc;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ucp.tcc.entities.Address;
import com.ucp.tcc.entities.Clinic;
import com.ucp.tcc.entities.Exam;
import com.ucp.tcc.entities.Specialization;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.record.clinic.req.ClinicReqRecord;
import com.ucp.tcc.record.veterinarian.VeterinarianReqRecord;
import com.ucp.tcc.services.ClinicService;
import com.ucp.tcc.services.ExamService;
import com.ucp.tcc.services.VaccineService;
import com.ucp.tcc.services.VeterinarianService;

@SpringBootApplication
public class TccBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TccBackendApplication.class, args);
		// Inicializa a conexão com o Arduino
//        ArduinoConnection arduino = new ArduinoConnection("COM3");

		// Tenta abrir a conexão
//        if (arduino.openConnection()) {
		// Lê os dados do Arduino (inicia o loop de leitura)
//            arduino.readData();
//        } else {
//            System.out.println("Não foi possível conectar ao Arduino.");
//        }

		// Fecha a conexão (opcional, caso queira parar em algum ponto)
		// arduino.closeConnection();
	}

	private final VaccineService vaccineService;
	private final ExamService examService;
	private final ClinicService clinicService;
	private final VeterinarianService veterinarianService;

	public TccBackendApplication(VaccineService vaccineService, ExamService examService, ClinicService clinicService,
			VeterinarianService veterinarianService) {
		this.vaccineService = vaccineService;
		this.examService = examService;
		this.clinicService = clinicService;
		this.veterinarianService = veterinarianService;
	}

	@Override
	public void run(String... args) throws Exception {
//		populaBanco();
	}

	public void populaBanco() {
		vaccineService.saveVaccine(new Vaccine("V10",
				"Protege contra as principais doenças virais que afetam os cães, como cinomose, parvovirose, leptospirose, adenovirose e outras."));
		vaccineService.saveVaccine(
				new Vaccine("Raiva", "Previne a raiva, uma doença viral fatal que pode ser transmitida para humanos."));
		vaccineService.saveVaccine(new Vaccine("Gripe Canina",
				"Protege contra o vírus da gripe canina, que causa sintomas respiratórios em cães."));
		vaccineService.saveVaccine(new Vaccine("Leishmaniose",
				"Ajuda a proteger contra a leishmaniose, uma doença parasitária transmitida por mosquitos."));
		vaccineService.saveVaccine(new Vaccine("Giárdia",
				"Previne a infecção por Giardia, um parasita que causa problemas gastrointestinais."));
		vaccineService.saveVaccine(new Vaccine("V4",
				"Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte."));
		vaccineService.saveVaccine(new Vaccine("Leucemia Felina (FeLV)",
				"Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos."));
		vaccineService.saveVaccine(new Vaccine("Imunodeficiência Felina (FIV)",
				"Vacina para ajudar a proteger contra o vírus da imunodeficiência felina, que enfraquece o sistema imunológico dos gatos."));

		examService.save(new Exam("Hemograma Completo",
				"Avalia a quantidade e o estado das células sanguíneas, incluindo glóbulos vermelhos, glóbulos brancos e plaquetas."));
		examService.save(new Exam("Bioquímico Sanguíneo",
				"Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos."));
		examService.save(new Exam("Exame de Urina",
				"Verifica a presença de cristais, bactérias, células e outros componentes na urina, ajudando a diagnosticar infecções urinárias, pedras nos rins e outras condições."));
		examService.save(new Exam("Ultrassonografia Abdominal",
				"Utiliza ondas sonoras para gerar imagens dos órgãos abdominais, como fígado, rins, baço e bexiga, avaliando sua estrutura e presença de anomalias."));
		examService.save(new Exam("Raio-X Torácico",
				"Exame de imagem que avalia a condição dos pulmões, coração e outros órgãos torácicos, útil no diagnóstico de doenças respiratórias e cardíacas."));
		examService.save(new Exam("Ecocardiograma",
				"Exame de ultrassom que avalia a estrutura e o funcionamento do coração, identificando possíveis problemas cardíacos."));
		examService.save(new Exam("Testes de Alergia",
				"Detecta sensibilidades a alérgenos comuns em cães, como pólen, alimentos e picadas de insetos, ajudando no diagnóstico de alergias."));
		examService.save(new Exam("Exame de Fezes",
				"Análise das fezes para detectar a presença de parasitas, sangue oculto e outras anormalidades que indicam problemas gastrointestinais."));
		examService.save(new Exam("Citologia de Pele",
				"Coleta de células da pele para análise microscópica, usada no diagnóstico de infecções de pele, alergias e tumores cutâneos."));
		examService.save(new Exam("Teste de Leishmaniose",
				"Detecta a presença do parasita Leishmania no organismo do cão, ajudando no diagnóstico precoce da doença."));

		Clinic clinic1 = clinicService.insertClinic(new ClinicReqRecord("Imperial Vet", "024876156684",
				new Address("25675033", "Petrópolis", "RJ", "Rua Mosela", "Mosela", "145")));

		Clinic clinic2 = clinicService.insertClinic(new ClinicReqRecord("SerraPet", "024876298564",
				new Address("25680045", "Petrópolis", "RJ", "Rua do Imperador", "Centro", "98")));

		Clinic clinic3 = clinicService.insertClinic(new ClinicReqRecord("Vet Petrópolis", "024876245678",
				new Address("25750040", "Petrópolis", "RJ", "Avenida Ayrton Senna", "Quitandinha", "550")));

		Clinic clinic4 = clinicService.insertClinic(new ClinicReqRecord("Clinica Animal", "024876135790",
				new Address("25710160", "Petrópolis", "RJ", "Estrada União e Indústria", "Itaipava", "320")));

		Clinic clinic5 = clinicService.insertClinic(new ClinicReqRecord("PetLove Care", "024876789012",
				new Address("25725100", "Petrópolis", "RJ", "Rua Bingen", "Bingen", "67")));

		Clinic clinic6 = clinicService.insertClinic(new ClinicReqRecord("AlfaVet", "024876374654",
				new Address("25615090", "Petrópolis", "RJ", "Rua Gonçalves Dias", "Valparaíso", "15")));

		veterinarianService.insertVeterinarian(
				new VeterinarianReqRecord("Dr. João Silva", "js@gmail.com", "CRMV-RJ 12345", "100301vV",
						Specialization.Small_Animal_Medical_Clinic, Set.of(clinic1.getUuid(), clinic2.getUuid())));

		veterinarianService.insertVeterinarian(
				new VeterinarianReqRecord("Dra. Maria Souza", "masa@gmail.com", "CRMV-RJ 67890", "100301vV",
						Specialization.Cardiology, Set.of(clinic1.getUuid(), clinic2.getUuid(), clinic5.getUuid())));

		veterinarianService.insertVeterinarian(new VeterinarianReqRecord("Dr. Pedro Oliveira", "p@gmail.com",
				"CRMV-RJ 54321", "100301vV", Specialization.Surgery, Set.of(clinic4.getUuid())));

		veterinarianService.insertVeterinarian(new VeterinarianReqRecord("Dra. Fernanda Lima", "nanda.vet@gmail.com",
				"CRMV-RJ 98765", "100301vV", Specialization.Dermatology, Set.of()));

		veterinarianService.insertVeterinarian(new VeterinarianReqRecord("Dr. Lucas Mendes", "lucas@gmail.com",
				"CRMV-RJ 11121", "100301vV", Specialization.Neurology, Set.of(clinic6.getUuid())));

		veterinarianService.insertVeterinarian(new VeterinarianReqRecord("Dra. Carla Reis", "calinhareis@gmail.com",
				"CRMV-RJ 31415", "100301vV", Specialization.Animal_Behavior, Set.of()));

		veterinarianService.insertVeterinarian(new VeterinarianReqRecord("Dr. Rafael Ferreira", "rafa.vet@gmail.com",
				"CRMV-RJ 16180", "100301vV", Specialization.Oncology, Set.of(clinic3.getUuid(), clinic6.getUuid())));

		veterinarianService
				.insertVeterinarian(new VeterinarianReqRecord("Dra. Aline Costa", "aline@mail.com", "CRMV-RJ 13579",
						"100301vV", Specialization.Wild_and_Exotic_Animal_Medicine, Set.of(clinic1.getUuid())));

	}
}
