#include <IRremote.h>
int RECV_PIN = 8;
IRrecv irrecv(RECV_PIN);
decode_results results;
int redPin = 5;
int bluePin = 6;
int greenPin = 7;
int relayOut1 = 9;
int relayOut2 = 10;
int buttonState1 ;
int buttonState2 ;
 
void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn(); 
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);  
  pinMode( relayOut1, OUTPUT); 
  pinMode( relayOut2, OUTPUT);
  buttonState1 = HIGH; 
  buttonState2 = HIGH; 
}
 
void loop() {
  buttonState1 = digitalRead(relayOut1);
  buttonState2 = digitalRead(relayOut2);
  if (irrecv.decode(&results)) {   
    
     if (results.value == 0x810) { 
        digitalWrite(relayOut1, LOW); 
        }
    if (results.value == 0x811) { 
        digitalWrite(relayOut1, HIGH); 
        }   
    if (results.value == 0x820) { 
        digitalWrite(relayOut2, LOW); 
        }
    if (results.value == 0x821) { 
        digitalWrite(relayOut2, HIGH); 
        } 
    
    if (results.value == 0x4B995E59) { 
      setColor(255, 0, 0);  
      delay(100);
      }
    if (results.value == 0xEF4EDF53) { 
       setColor(0, 255, 0);  
      delay(100);
      }
    if (results.value == 0xF04EE0E6) { 
      setColor(255, 0, 255);  
      delay(100);
      }   
    if (results.value == 0x5F564B6A) { 
      setColor(0, 0, 255);  
      delay(100);
      }
     if (results.value == 0x1639AB6E) { 
      setColor(0, 0, 0);  
      delay(100);
      }
      
    irrecv.resume(); 
  }
  
  Serial.print(" ");
  Serial.println(results.value, HEX);
  delay(100);
  
}

void setColor(int red, int blue, int green)
{
  analogWrite(redPin, red); 
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);  
}
