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

// ** em casa **
// Defina as credenciais Wi-Fi
//const char* ssid = USER;
//const char* password = SENHA;

// Defina o URL da API local - roteador casa
// Substitua pelo IP da sua API
//const String serverUrlContLoc = "http://192.168.1.6:8080/localization";
//const String serverUrlRefLoc = "http://192.168.1.6:8080/pets/localization";  

// ** celular **
// Defina as credenciais Wi-Fi
const char* ssid = USER;
const char* password = SENHA;

// Defina o URL da API local - roteador celular
// Substitua pelo IP da sua API
 const String serverUrlContLoc = "http://172.20.10.7:8080/localization";
 const String serverUrlRefLoc = "http://172.20.10.7:8080/pets/localization"; 

// Criação do objeto WiFiClient
WiFiClient wifiClient;

String chipID;
const int buttonPin = 14; // Pino do botão
unsigned long previousMillis = 0; // Armazena o tempo da última requisição
const long interval = 15000; // Intervalo de 5 minutos (300000 ms) - 1min 60000

void setup() {
  Serial.begin(9600);
  ss.begin(9600); // Iniciando a comunicação com o módulo GPS
  pinMode(buttonPin, INPUT);
   
  // Obtém o ID único do ESP8266
  chipID = String(ESP.getChipId());
  Serial.println("");
  Serial.print("chipID: "); Serial.println(chipID);
  
  // Inicia a conexão Wi-Fi
  connectToWiFi();
}

void loop() {
  // Atualiza os dados do GPS
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  // Verifica se é hora de enviar a requisição periódica (5 minutos)
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    if (gps.location.isUpdated()) {
      sendContinuosLocToAPI(gps.location.lat(), gps.location.lng(), chipID);
    }
  }

  // Verifica o estado do botão
  int buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    // Quando o botão for pressionado, envia as coordenadas instantaneamente
    if (gps.location.isUpdated()) {
      sendRefLocToAPI(gps.location.lat(), gps.location.lng(), chipID);
    } else {
      Serial.println("Sem dados de localização no momento.");
    }
    delay(200); // Debounce simples para o botão
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
void sendContinuosLocToAPI(float latitude, float longitude, String chipID) {
  Serial.println("Chamada contínua...");
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Constrói a URL completa
    http.begin(wifiClient, serverUrlContLoc);
    http.addHeader("Content-Type", "application/json");

    // Cria o payload em formato JSON
    String payload = "{\"latitude\": \"" + String(latitude, 6) + "\", \"longitude\": \"" + String(longitude, 6) + "\", \"chipID\": \"" + chipID + "\"}";
    Serial.println("Enviando dados: ");
    Serial.println(payload);
    
    // Faz o POST e obtém a resposta
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Resposta do servidor: ");
        Serial.println(response);
    } else {
        // Exibe o código de erro
        Serial.print("Erro ao enviar requisição: ");
        Serial.println(httpResponseCode);
        
        // Tenta imprimir a mensagem de erro detalhada
        Serial.println("Descrição do erro: " + http.errorToString(httpResponseCode));
        
        // Tenta capturar a resposta do servidor, caso exista
        String errorResponse = http.getString();
        if (errorResponse.length() > 0) {
            Serial.println("Resposta do servidor: " + errorResponse);
        }
    }

    // Fecha a conexão
    http.end();
  } else {
    Serial.println("Erro na conexão Wi-Fi");
  }
}

// Função para enviar os dados para a API via HTTP PUT
void sendRefLocToAPI(float latitude, float longitude, String chipID) {
  Serial.println("Botão pressionado.");
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(wifiClient, serverUrlRefLoc);
    http.addHeader("Content-Type", "application/json");
    // Cria o payload em formato JSON
    String payload = "{\"latitude\": \"" + String(latitude, 6) + "\", \"longitude\": \"" + String(longitude, 6) + "\", \"chipID\": \"" + chipID + "\"}";
    Serial.println("Enviando dados: ");
    Serial.println(payload);
    
    // Faz o PUT e obtém a resposta
    int httpResponseCode = http.PUT(payload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta do servidor: ");
      Serial.println(response);
    } else {
      Serial.println("Erro ao enviar requisição: " + String(httpResponseCode));
    }

    // Fecha a conexão
    http.end();
  } else {
    Serial.println("Erro na conexão Wi-Fi");
  }
}
