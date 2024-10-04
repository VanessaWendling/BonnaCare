package com.ucp.tcc.utils;

import java.util.Scanner;

import com.fazecast.jSerialComm.SerialPort;

public class ArduinoConnection {
	
    private String arduinoPort;
    private SerialPort comPort;

    // Construtor da classe para inicializar a porta correta
    public ArduinoConnection(String arduinoPort) {
        this.arduinoPort = arduinoPort;
        this.comPort = SerialPort.getCommPort(arduinoPort);
        this.comPort.setBaudRate(9600);  // Configura a taxa de transmissão
    }

    // Método para abrir a conexão com o Arduino
    public boolean openConnection() {
        return comPort.openPort();  // Abre a porta e retorna true se a conexão for bem-sucedida
    }

    // Método para ler dados do Arduino
    public void readData() {
        if (comPort.isOpen()) {
            System.out.println("Conectado ao Arduino na porta " + arduinoPort);

            // Configura timeout para leitura
            comPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_BLOCKING, 1000, 1000);

            try (// Scanner para ler os dados
			Scanner dataScanner = new Scanner(comPort.getInputStream())) {
				// Loop para ler continuamente os dados do Arduino
				while (true) {  // Loop infinito para leitura contínua
				    if (dataScanner.hasNextLine()) {
				        try {
				            String line = dataScanner.nextLine();  // Lê a linha de dados do Arduino
				            System.out.println("Recebido do Arduino: " + line);
				        } catch (Exception e) {
				            e.printStackTrace();
				        }
				    }
				}
			}
        } else {
            System.out.println("Porta não está aberta.");
        }
    }

    // Método para fechar a conexão
    public void closeConnection() {
        if (comPort.isOpen()) {
            comPort.closePort();
            System.out.println("Porta fechada.");
        }
    }
}
