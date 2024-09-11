#include <SoftwareSerial.h>
#include <TinyGPS++.h> // Biblioteca TinyGPS++ para facilitar o parse
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Criando a comunicação serial para o GPS nos pinos TX e RX
int RXPin = 2;
int TXPin = 3;
SoftwareSerial ss(RXPin, TXPin); // RX, TX (mude de acordo com os pinos que você está utilizando)

// Inicializando a biblioteca TinyGPS++
TinyGPSPlus gps;

// Defina as credenciais Wi-Fi
const char* ssid = "FelipeW";
const char* password = "87654321";

// Defina o URL da API local
const String serverUrl = "http://192.168.1.9:8080/localization";  // Substitua pelo IP da sua API

// Criação do objeto WiFiClient
WiFiClient wifiClient;

String chipID;

void setup() {
  Serial.begin(9600);
  ss.begin(9600); // Iniciando a comunicação com o módulo GPS

  // Obtém o ID único do ESP8266
  chipID = String(ESP.getChipId());
  Serial.print("chipID:"); Serial.println(chipID);
  // Inicia a conexão Wi-Fi
  connectToWiFi();
}

void loop() {
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  if (gps.location.isUpdated()) {
    Serial.print("Latitude: ");
    float latitude = gps.location.lat();
    Serial.println(latitude, 6);
    
    Serial.print("Longitude: ");
    float longitude = gps.location.lng();
    Serial.println(longitude, 6);

    // Velocidade em km/h
    Serial.print("Velocidade (km/h): ");
    Serial.println(gps.speed.kmph());
    
    // Altitude em metros
    Serial.print("Altitude (m): ");
    Serial.println(gps.altitude.meters());

    // Número de satélites conectados
    Serial.print("Satélites: ");
    Serial.println(gps.satellites.value());

    sendToAPI(latitude, longitude, chipID);
    
  }   
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.println("Conectando ao Wi-Fi...");
  
  int max_attempts = 60;  // Tentará conectar por 20 segundos antes de desistir
  int attempt = 0;
  
  while (WiFi.status() != WL_CONNECTED && attempt < max_attempts) {
    delay(1000);
    Serial.print(".");
    attempt++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConectado ao Wi-Fi!");
    Serial.print("Endereço IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFalha na conexão ao Wi-Fi. Verifique suas credenciais.");
  }
}


// Função para enviar os dados para a API via HTTP POST
void sendToAPI(float latitude, float longitude, String chipID) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Constrói a URL completa
    http.begin(wifiClient, serverUrl);  // Corrigido: Passando o WiFiClient
    
    http.addHeader("Content-Type", "application/json");

    // Cria o payload em formato JSON
    String payload = "{\"latitude\": \"" + String(latitude, 6) + "\", \"longitude\": \"" + String(longitude, 6) + "\", \"chipID\": \"" + chipID + "\"}";
    
    // Faz o POST e obtém a resposta
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta do servidor: " + response);
    } else {
      Serial.println("Erro ao enviar requisição: " + String(httpResponseCode));
    }

    // Fecha a conexão
    http.end();
  } else {
    Serial.println("Erro na conexão Wi-Fi");
  }

  delay(300000);  // Espera 5 minutos antes de enviar os próximos dados
}
