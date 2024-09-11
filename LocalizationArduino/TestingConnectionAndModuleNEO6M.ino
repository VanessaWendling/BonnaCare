#include <SoftwareSerial.h>
#include <TinyGPS++.h> // Biblioteca TinyGPS++ para facilitar o parse

// Criando a comunicação serial para o GPS nos pinos TX e RX
int RXPin = 2;
int TXPin = 3;
SoftwareSerial ss(RXPin, TXPin); // RX, TX (mude de acordo com os pinos que você está utilizando)

// Inicializando a biblioteca TinyGPS++
TinyGPSPlus gps;

void setup() {
  Serial.begin(9600);
  ss.begin(9600); // Iniciando a comunicação com o módulo GPS
}

void loop() {
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  if (gps.location.isUpdated()) {
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);

    // Velocidade em km/h
    Serial.print("Velocidade (km/h): ");
    Serial.println(gps.speed.kmph());
    
    // Altitude em metros
    Serial.print("Altitude (m): ");
    Serial.println(gps.altitude.meters());

    // Número de satélites conectados
    Serial.print("Satélites: ");
    Serial.println(gps.satellites.value());
  }   
}
