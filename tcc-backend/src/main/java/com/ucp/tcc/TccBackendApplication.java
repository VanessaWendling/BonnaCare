package com.ucp.tcc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ucp.tcc.entities.Exam;
import com.ucp.tcc.entities.Vaccine;
import com.ucp.tcc.services.ExamService;
import com.ucp.tcc.services.VaccineService;

@SpringBootApplication
public class TccBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TccBackendApplication.class, args);
	}
	
	@Autowired
	private VaccineService vaccineService;
	
	@Autowired
	private ExamService examService;
	
	@Override
	public void run(String... args) throws Exception {
		populaBanco();
	}
	
	public void populaBanco() {
		vaccineService.saveVaccine(new Vaccine("V10", "Protege contra as principais doenças virais que afetam os cães, como cinomose, parvovirose, leptospirose, adenovirose e outras."));
		vaccineService.saveVaccine(new Vaccine("Raiva", "Previne a raiva, uma doença viral fatal que pode ser transmitida para humanos."));
		vaccineService.saveVaccine(new Vaccine("Gripe Canina", "Protege contra o vírus da gripe canina, que causa sintomas respiratórios em cães."));
		vaccineService.saveVaccine(new Vaccine("Leishmaniose", "Ajuda a proteger contra a leishmaniose, uma doença parasitária transmitida por mosquitos."));
		vaccineService.saveVaccine(new Vaccine("Giárdia", "Previne a infecção por Giardia, um parasita que causa problemas gastrointestinais."));
		vaccineService.saveVaccine(new Vaccine("V4", "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte."));
		vaccineService.saveVaccine(new Vaccine("Leucemia Felina (FeLV)", "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos."));
		vaccineService.saveVaccine(new Vaccine("Imunodeficiência Felina (FIV)", "Vacina para ajudar a proteger contra o vírus da imunodeficiência felina, que enfraquece o sistema imunológico dos gatos."));
		
		examService.save(new Exam("Hemograma Completo", "Avalia a quantidade e o estado das células sanguíneas, incluindo glóbulos vermelhos, glóbulos brancos e plaquetas."));
		examService.save(new Exam("Bioquímico Sanguíneo", "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos."));
		examService.save(new Exam("Exame de Urina", "Verifica a presença de cristais, bactérias, células e outros componentes na urina, ajudando a diagnosticar infecções urinárias, pedras nos rins e outras condições."));
		examService.save(new Exam("Ultrassonografia Abdominal", "Utiliza ondas sonoras para gerar imagens dos órgãos abdominais, como fígado, rins, baço e bexiga, avaliando sua estrutura e presença de anomalias."));
		examService.save(new Exam("Raio-X Torácico", "Exame de imagem que avalia a condição dos pulmões, coração e outros órgãos torácicos, útil no diagnóstico de doenças respiratórias e cardíacas."));
		examService.save(new Exam("Ecocardiograma", "Exame de ultrassom que avalia a estrutura e o funcionamento do coração, identificando possíveis problemas cardíacos."));
		examService.save(new Exam("Testes de Alergia", "Detecta sensibilidades a alérgenos comuns em cães, como pólen, alimentos e picadas de insetos, ajudando no diagnóstico de alergias."));
		examService.save(new Exam("Exame de Fezes", "Análise das fezes para detectar a presença de parasitas, sangue oculto e outras anormalidades que indicam problemas gastrointestinais."));
		examService.save(new Exam("Citologia de Pele", "Coleta de células da pele para análise microscópica, usada no diagnóstico de infecções de pele, alergias e tumores cutâneos."));
		examService.save(new Exam("Teste de Leishmaniose", "Detecta a presença do parasita Leishmania no organismo do cão, ajudando no diagnóstico precoce da doença."));

	}

}
