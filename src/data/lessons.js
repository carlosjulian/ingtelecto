import { boardSpecs } from "./boardSpecs.js";
import {
  formatMelody,
  melodies,
  rgbPresets,
  ledColorParam,
  obstacleParams,
} from "./helpers.js";

export { boardSpecs, formatMelody, melodies, rgbPresets, ledColorParam, obstacleParams };

/**
 * Catálogo interactivo de las 11 lecciones del curso Aprender Arduino.
 * Cada lección encapsula metadatos didácticos, asignación de pines, código C++,
 * especificaciones técnicas, callouts 3D y parámetros reactivos de simulación.
 */
export const lessons = [
  {
    id: "board",
    title: "Conoce la placa",
    cardTitle: "1. Conoce la<br />placa",
    thumb: "board",
    heading: "Arduino Uno",
    lede: "El Arduino Uno es una placa de desarrollo basada en el microcontrolador ATmega328P. Es fácil de usar y perfecta para aprender electrónica, programación y prototipado.",
    features: [
      ["chip", "Hardware de código abierto"],
      ["bulb", "Gran comunidad global de soporte"],
      ["gear", "Usado en educación, proyectos maker y<br />aplicaciones del mundo real"],
    ],
    pinout: [
      ["D0–D13", "E/S Digital", "Lee botones, conmuta LEDs. Los pines ~3, 5, 6, 9, 10, 11 soportan PWM.", "#2a56a3"],
      ["A0–A5", "Entradas analógicas", "Lecturas ADC de 10 bits: 0–1023 para voltajes de 0–5 V.", "#1aa3a1"],
      ["5V · 3.3V", "Alimentación", "Salidas de voltaje regulado para sensores y módulos.", "#d64a3a"],
      ["GND", "Tierra (GND)", "Punto de retorno común para todos los circuitos.", "#2f3547"],
      ["VIN", "Entrada de voltaje", "Voltaje directo del conector jack, rango 7–12 V.", "#c0652d"],
      ["RESET", "Reinicio (Reset)", "Nivel BAJO (LOW) para reiniciar la ejecución del programa.", "#8e9094"],
    ],
    example: [
      "<code>setup()</code> se ejecuta una sola vez al energizar o reiniciar la placa.",
      "<code>pinMode(LED_BUILTIN, OUTPUT)</code> configura el pin 13 (conectado al LED integrado “L”) como salida.",
      "<code>loop()</code> se repite indefinidamente. <code>digitalWrite(…, HIGH)</code> aplica 5 V al pin y enciende el LED.",
      "Presiona <b>Ejecutar</b> para cargar el código: observa el parpadeo de TX/RX y el encendido del LED L. Haz clic en cualquier componente para conocer su función.",
    ],
    specs: boardSpecs,
    code: "void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n}",
    callouts: [
      {"anchor": "usb", "icon": "usb", "tall": true, "title": "Puerto USB", "body": "Conecta a tu ordenador<br />para programar y alimentar.", "x": -498, "y": -314, "w": 275, "side": "bottom", "at": 131, "leg": 30, "ring": true},
      {"anchor": "mcu", "via": "mcuWay", "icon": "chip", "title": "Microcontrolador", "body": "El chip ATmega328P ejecuta<br />tu código C++.", "x": -112, "y": -347, "w": 268, "side": "bottom", "at": 84},
      {"anchor": "digital", "icon": "pins", "title": "Pines digitales", "body": "Pines 0–13 para entrada<br />y salida digital.<br />(~ PWM en pines selectos)", "x": 263, "y": -301, "w": 255, "side": "left", "at": 59, "leg": 36, "approach": "above"},
      {"anchor": "jack", "icon": "bolt", "title": "Conector Jack", "body": "Alimentación DC externa<br />(recomendado 7–12V).", "x": -498, "y": 125, "w": 253, "side": "top", "at": 89, "leg": 48, "ring": true},
      {"anchor": "power", "icon": "plug", "title": "Pines de alimentación", "body": "5V, 3.3V, GND y<br />VIN para energía.", "x": -198, "y": 195, "w": 225, "side": "top", "at": 75, "leg": 32, "ring": true},
      {"anchor": "analog", "icon": "wave", "wide": true, "title": "Pines analógicos", "body": "A0–A5 para leer<br />voltajes variables.", "x": 270, "y": 183, "w": 223, "side": "left", "at": 54, "leg": 46, "ring": true},
    ],
    sim: "builtin",
  },
  {
    id: "blink",
    title: "Parpadear un LED",
    cardTitle: "2. Parpadear un LED",
    thumb: "led",
    heading: "Parpadear un LED",
    lede: "Tu primer circuito: un diodo emisor de luz (LED) y una resistencia en la protoboard, gobernados desde el pin 13. Conmutar el pin con una pausa intermedia produce el parpadeo.",
    features: [
      ["pin", "Salida digital mediante <code>digitalWrite()</code>"],
      ["resistor", "Haz clic en la resistencia para probar diferentes valores"],
      ["clock", "Haz clic en el LED para modificar color y tiempos"],
    ],
    pinout: [
      ["D13", "Resistencia → LED (+)", "El programa conmuta este pin entre HIGH (5 V) y LOW (0 V).", "#f0a53a"],
      ["GND", "LED (−)", "El terminal corto (cátodo) retorna la corriente a tierra.", "#2f3547"],
    ],
    example: [
      "<code>const int LED_PIN = 13;</code> asigna un nombre claro y legible al pin de control.",
      "En <code>setup()</code>, <code>pinMode(LED_PIN, OUTPUT)</code> habilita el pin para suministrar corriente.",
      "<code>loop()</code> escribe HIGH, espera, escribe LOW y vuelve a pausar. Ambos retardos definen el ritmo.",
      "Una resistencia mayor reduce la corriente: prueba con 10 kΩ y nota cómo el LED reduce drásticamente su brillo.",
    ],
    specs: [
      ["LED", "5 mm, 1.8–3.2 V directo"],
      ["Corriente máxima", "20 mA"],
      ["Resistencia", "220 Ω (rojo-rojo-marrón)"],
      ["Corriente del LED", "≈ (5 − 2) ÷ 220 ≈ 14 mA"],
      ["Límite del pin 13", "40 mA máximo absoluto"],
    ],
    params: [
      ledColorParam,
      {
      "key": "on",
      "part": "led",
      "label": "Encendido durante",
      "type": "range",
      "min": 50,
      "max": 2000,
      "step": 50,
      "value": 500,
      "unit": "ms"
},
      {
      "key": "off",
      "part": "led",
      "label": "Apagado durante",
      "type": "range",
      "min": 50,
      "max": 2000,
      "step": 50,
      "value": 500,
      "unit": "ms"
},
      {
      "key": "ohms",
      "part": "resistor",
      "label": "Resistencia",
      "type": "choice",
      "value": 220,
      "options": [
            {
                  "value": 220,
                  "label": "220 Ω",
                  "note": "Aprox. 14 mA: brillo óptimo y operación segura."
            },
            {
                  "value": 1000,
                  "label": "1 kΩ",
                  "note": "Aprox. 3 mA: notablemente más tenue."
            },
            {
                  "value": 10000,
                  "label": "10 kΩ",
                  "note": "Aprox. 0.3 mA: brillo apenas perceptible."
            }
      ]
},
    ],
    code: "const int LED_PIN = 13;\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay({{on}});\n  digitalWrite(LED_PIN, LOW);\n  delay({{off}});\n}",
    callouts: [
      {"anchor": "part:led", "icon": "led", "title": "Diodo LED", "body": "Se ilumina cuando el pin 13 pasa a nivel ALTO (HIGH).", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D13", "icon": "pin", "title": "Pin digital 13", "body": "Tu código lo conmuta alternando HIGH y LOW.", "x": -162, "y": -350, "w": 250, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:GND", "icon": "ground", "title": "Línea GND", "body": "El terminal corto (−) cierra el circuito a tierra.", "x": -498, "y": -330, "w": 236, "side": "right", "at": 46, "leg": 30, "ring": true},
      {"anchor": "part:resistor", "icon": "resistor", "wide": true, "title": "Resistencia limitadora", "body": "Protege al LED disipando el exceso de corriente.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
      {"anchor": "ledL", "icon": "bulb", "title": "LED integrado (L)", "body": "El LED superficial refleja el estado del pin 13 en placa.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
    ],
    sim: "blink",
  },
  {
    id: "button",
    title: "Pulsar un botón",
    cardTitle: "3. Pulsar un botón",
    thumb: "button",
    heading: "Pulsar un botón",
    lede: "Las entradas permiten a la placa interactuar con el entorno físico. Un pulsador conecta el pin 2 a 5 V al presionarlo; una resistencia pull-down asegura 0 V estables cuando lo sueltas.",
    features: [
      ["button", "Haz clic y mantén presionado el botón en la escena"],
      ["pin", "Lee señales de entrada con <code>digitalRead()</code>"],
      ["logic", "Compara entre lógica momentánea (“hold”) y conmutada (“toggle”)"],
    ],
    pinout: [
      ["5V", "Pulsador (izq.)", "Terminal de alimentación del interruptor.", "#d64a3a"],
      ["D2", "Pulsador (der.) + 10 kΩ", "Registra HIGH (1) mientras se mantenga presionado.", "#3d6fc4"],
      ["GND", "Resistencia 10 kΩ (Pull-down)", "Drena el pin a tierra para asegurar nivel LOW al soltar.", "#2f3547"],
      ["D13", "220 Ω → LED", "Salida visual controlada por el botón.", "#f0a53a"],
    ],
    example: [
      "<code>pinMode(BUTTON, INPUT)</code> configura el pin 2 en alta impedancia para leer voltaje sin perturbar el circuito.",
      "<code>digitalRead(BUTTON)</code> devuelve HIGH (1) con el botón presionado y LOW (0) al liberarlo.",
      "En modo <b>momentáneo</b>, el pin 13 replica el estado: presionado enciende, libre apaga.",
      "En modo <b>conmutado</b>, el software detecta el flanco de subida y alterna el estado del LED con antirrebote (debounce).",
    ],
    specs: [
      ["Pulsador", "Interruptor táctil de 12 mm"],
      ["Pull-down", "10 kΩ conectada a GND"],
      ["Umbrales lógicos", "LOW < 1.5 V, HIGH > 3 V"],
      ["Rebote mecánico", "Oscilaciones de contacto durante ~5 ms"],
      ["Consejo profesional", "<code>INPUT_PULLUP</code> usa resistencias internas sin componentes extra"],
    ],
    params: [
      {
      "key": "mode",
      "part": "button",
      "label": "Lógica de control",
      "type": "choice",
      "value": "hold",
      "options": [
            {
                  "value": "hold",
                  "label": "Momentáneo",
                  "note": "El LED se enciende únicamente mientras mantienes el botón presionado.",
                  "code": {
                        "globals": "",
                        "logic": "  int pressed = digitalRead(BUTTON);\n  digitalWrite(LED, pressed);"
                  }
            },
            {
                  "value": "toggle",
                  "label": "Conmutado",
                  "note": "Cada pulsación conmuta el estado del LED entre encendido y apagado.",
                  "code": {
                        "globals": "\nint last = LOW;\nbool lit = false;\n",
                        "logic": "  int now = digitalRead(BUTTON);\n  if (now == HIGH && last == LOW) {\n    lit = !lit;\n    digitalWrite(LED, lit);\n    delay(30);  // debounce\n  }\n  last = now;"
                  }
            }
      ]
},
      ledColorParam,
    ],
    code: "const int BUTTON = 2;\nconst int LED = 13;\n{{mode.globals}}\nvoid setup() {\n  pinMode(BUTTON, INPUT);\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n{{mode.logic}}\n}",
    callouts: [
      {"anchor": "part:button", "icon": "button", "title": "Pulsador táctil", "body": "Mantenlo pulsado para conectar 5 V directamente al pin 2.", "x": -162, "y": -350, "w": 256, "side": "bottom", "at": 200, "leg": 30, "ring": true},
      {"anchor": "part:pulldown", "icon": "resistor", "wide": true, "title": "Pull-down", "body": "10 kΩ keeps pin 2 LOW when released.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
      {"anchor": "part:led", "icon": "led", "title": "LED indicador", "body": "Muestra visualmente la respuesta de la lógica programada.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D2", "icon": "pin", "title": "Pin 2 (Entrada)", "body": "<code>digitalRead()</code> detecta estado lógico HIGH o LOW.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
    ],
    sim: "button",
  },
  {
    id: "knob",
    title: "Girar un potenciómetro",
    cardTitle: "4. Girar un<br />potenciómetro",
    thumb: "pot",
    heading: "Girar un potenciómetro",
    lede: "Un potenciómetro es una resistencia variable con tres terminales. Al girar su eje, la terminal central recorre una pista resistiva de 0 V a 5 V, y el conversor ADC convierte ese voltaje en datos digitales.",
    features: [
      ["knob", "Arrastra el cursor alrededor de la perilla para girarla"],
      ["wave", "<code>analogRead()</code> entrega lecturas discretas de 0 a 1023"],
      ["pwm", "<code>analogWrite()</code> modula el brillo del LED entre 0 y 255"],
    ],
    pinout: [
      ["5V", "Potenciómetro (izq.)", "Extremo superior del divisor de tensión.", "#d64a3a"],
      ["A0", "Potenciómetro (centro)", "Cursor móvil: varía continuamente de 0 a 5 V según el giro.", "#3fae6a"],
      ["GND", "Potenciómetro (der.)", "Extremo inferior de referencia a tierra.", "#2f3547"],
      ["~D9", "220 Ω → LED", "Salida PWM cuya modulación ajusta el brillo del LED.", "#f0a53a"],
    ],
    example: [
      "<code>analogRead(A0)</code> muestrea el voltaje del terminal móvil mediante el convertidor ADC de 10 bits de la placa.",
      "El convertidor entrega un rango entero de 0 a 1023 (donde 0 representa 0 V y 1023 representa 5 V).",
      "Dividir entre 4 transforma el valor al intervalo 0–255, coincidiendo con la resolución de 8 bits de <code>analogWrite()</code>.",
      "Abre el Monitor Serial para observar los datos transmitidos en tiempo real mientras mueves la perilla.",
    ],
    specs: [
      ["Potenciómetro", "10 kΩ lineal, recorrido angular de 270°"],
      ["Resolución ADC", "10 bits, rango de 0 a 1023"],
      ["Sensibilidad", "≈ 4.9 mV por unidad digital"],
      ["Resolución PWM", "8 bits (0–255) a ~490 Hz"],
      ["Tiempo de conversión", "≈ 100 µs por ejecución de <code>analogRead()</code>"],
    ],
    params: [
      {
      "key": "pot",
      "part": "pot",
      "label": "Posición de perilla",
      "type": "range",
      "min": 0,
      "max": 1023,
      "step": 1,
      "value": 620
},
      ledColorParam,
    ],
    code: "const int POT = A0;\nconst int LED = 9;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  int value = analogRead(POT);  // 0-1023\n  analogWrite(LED, value / 4);  // 0-255\n  Serial.println(value);\n  delay(50);\n}",
    callouts: [
      {"anchor": "part:pot", "icon": "knob", "title": "Potenciómetro lineal", "body": "Gira la perilla para variar el divisor de tensión entre 0 V y 5 V.", "x": -162, "y": -350, "w": 252, "side": "bottom", "at": 200, "leg": 30, "ring": true},
      {"anchor": "pin:A0", "icon": "wave", "wide": true, "title": "Pin analógico A0", "body": "Digitaliza el voltaje en un número entero de 0 a 1023.", "x": -498, "y": 130, "w": 252, "side": "top", "at": 150, "leg": 40, "ring": true},
      {"anchor": "part:led", "icon": "led", "title": "LED regulado", "body": "Su luminosidad varía proporcionalmente a la posición del eje.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D9", "icon": "pwm", "wide": true, "title": "Pin ~9 (PWM)", "body": "Modula el ciclo de trabajo para regular la potencia entregada.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
    ],
    sim: "knob",
  },
  {
    id: "rgb",
    title: "Mezclar colores",
    cardTitle: "5. Mezclar<br />colores",
    thumb: "rgb",
    heading: "Mezclar colores",
    lede: "Un LED RGB integra tres emisores (rojo, verde y azul) en una cápsula difusa. Regulando la intensidad individual de cada canal mediante modulación PWM se compone cualquier matiz del espectro visible.",
    features: [
      ["pwm", "Tres pines PWM independientes, 0–255 por canal"],
      ["bulb", "Mezcla aditiva: rojo + verde produce amarillo puro"],
      ["led", "Haz clic en el LED para mezclar tu propia combinación"],
    ],
    pinout: [
      ["~D9", "220 Ω → Terminal Rojo", "Intensidad y ciclo de trabajo para el canal rojo.", "#ee7f62"],
      ["~D10", "220 Ω → Terminal Verde", "Intensidad y ciclo de trabajo para el canal verde.", "#3fae6a"],
      ["~D11", "220 Ω → Terminal Azul", "Intensidad y ciclo de trabajo para el canal azul.", "#3d6fc4"],
      ["GND", "Cátodo común (pata larga)", "Línea de retorno común compartida por los tres canales.", "#2f3547"],
    ],
    example: [
      "Cada color se asigna a un pin PWM dedicado: pin 9 para rojo, 10 para verde y 11 para azul.",
      "Los tres diodos internos comparten el terminal de cátodo común (la pata de mayor longitud).",
      "<code>analogWrite(pin, intensidad)</code> fija el ciclo de trabajo de 0 (apagado) a 255 (máximo brillo).",
      "Mueve los deslizadores RGB o selecciona un preajuste para apreciar la síntesis aditiva del color.",
    ],
    specs: [
      ["LED", "5 mm RGB, configuración cátodo común"],
      ["Voltaje directo (Vf)", "R 2.0 V · G 3.0 V · B 3.0 V"],
      ["Resistencias de polarización", "3 × 220 Ω"],
      ["Generadores PWM", "Temporizadores por hardware independientes"],
      ["Profundidad de color", "256³ ≈ 16.7 millones de combinaciones cromáticas"],
    ],
    params: [
      {
      "key": "preset",
      "part": "rgb",
      "label": "Preajustes",
      "type": "swatch",
      "value": "purple",
      "options": [
            {
                  "value": "purple",
                  "label": "Púrpura",
                  "color": "#a43cf0"
            },
            {
                  "value": "pink",
                  "label": "Rosa",
                  "color": "#f2457f"
            },
            {
                  "value": "orange",
                  "label": "Naranja",
                  "color": "#f57a1f"
            },
            {
                  "value": "yellow",
                  "label": "Amarillo",
                  "color": "#f5c330"
            },
            {
                  "value": "teal",
                  "label": "Turquesa",
                  "color": "#1fbf98"
            },
            {
                  "value": "white",
                  "label": "Blanco",
                  "color": "#f4f0e8"
            }
      ]
},
      {
      "key": "r",
      "part": "rgb",
      "label": "Canal Rojo (R)",
      "type": "range",
      "min": 0,
      "max": 255,
      "step": 1,
      "value": 170,
      "tint": "#e8392e"
},
      {
      "key": "g",
      "part": "rgb",
      "label": "Canal Verde (G)",
      "type": "range",
      "min": 0,
      "max": 255,
      "step": 1,
      "value": 0,
      "tint": "#3fbf6a"
},
      {
      "key": "b",
      "part": "rgb",
      "label": "Canal Azul (B)",
      "type": "range",
      "min": 0,
      "max": 255,
      "step": 1,
      "value": 255,
      "tint": "#3d7be0"
},
    ],
    code: "const int RED = 9;\nconst int GREEN = 10;\nconst int BLUE = 11;\n\nvoid setup() {\n  pinMode(RED, OUTPUT);\n  pinMode(GREEN, OUTPUT);\n  pinMode(BLUE, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(RED, {{r}});\n  analogWrite(GREEN, {{g}});\n  analogWrite(BLUE, {{b}});\n  delay(100);\n}",
    callouts: [
      {"anchor": "part:rgb", "icon": "rgb", "title": "LED RGB integrado", "body": "Tres matrices semiconductoras (R, G, B) bajo una sola lente difusora.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D10", "icon": "pwm", "wide": true, "title": "Pins ~9 ~10 ~11", "body": "One PWM pin for each colour.", "x": -162, "y": -350, "w": 252, "side": "bottom", "at": 70, "leg": 30, "ring": true},
      {"anchor": "pin:GND", "icon": "ground", "title": "Cátodo común (GND)", "body": "Retorno eléctrico unificado conectado a tierra.", "x": -498, "y": -330, "w": 236, "side": "right", "at": 46, "leg": 30, "ring": true},
      {"anchor": "part:r-green", "icon": "resistor", "wide": true, "title": "3 Resistors", "body": "220 Ω on each colour keeps the current safe.", "x": 270, "y": 160, "w": 248, "side": "left", "at": 46, "leg": 40, "ring": true},
    ],
    sim: "rgb",
  },
  {
    id: "light",
    title: "Detectar luz",
    cardTitle: "6. Detectar luz",
    thumb: "lamp",
    heading: "Detectar luz",
    lede: "Una fotorresistencia (LDR) reduce su resistencia óhmica conforme aumenta la luz que incide sobre ella. Junto con una resistencia fija de 10 kΩ, forma un divisor de tensión que permite medir la iluminación.",
    features: [
      ["bulb", "Mayor iluminación ambiental reduce la resistencia interna"],
      ["lamp", "Haz clic o arrastra la lámpara para modificar el flujo luminoso"],
      ["code", "Enciende automáticamente el LED cuando disminuye la luz"],
    ],
    pinout: [
      ["5V", "LDR (extremo superior)", "Alimentación positiva del divisor resistivo.", "#d64a3a"],
      ["A0", "LDR + 10 kΩ (nodo medio)", "Tensión intermedia proporcional a la intensidad de luz.", "#3fae6a"],
      ["GND", "Resistencia 10 kΩ (extremo inferior)", "Referencia a tierra del divisor.", "#2f3547"],
      ["~D9", "220 Ω → LED", "Salida de iluminación automática (luz de noche).", "#f0a53a"],
      ["GND", "LED (−)", "Línea de retorno a tierra del LED.", "#2f3547"],
    ],
    example: [
      "La fotorresistencia y la resistencia fija de 10 kΩ dividen la tensión de 5 V según el nivel de luminosidad.",
      "Al incidir más luz, la resistencia del sensor baja y el voltaje medido en A0 se aproxima a 5 V.",
      "Cuando la lectura desciende por debajo de <code>threshold</code>, el programa enciende el LED a modo de luz nocturna.",
      "Acerca, aleja o apaga la lámpara para corroborar las lecturas reportadas en la consola serial.",
    ],
    specs: [
      ["Fotorresistencia", "LDR tipo GL5528"],
      ["Resistencia con luz", "≈ 10–20 kΩ"],
      ["Resistencia en oscuridad", "≈ 1 MΩ"],
      ["Resistencia de referencia", "10 kΩ conectada a GND"],
      ["Tiempo de respuesta", "≈ 20–30 ms"],
    ],
    params: [
      {
      "key": "dist",
      "part": "lamp",
      "label": "Distancia de la fuente",
      "type": "range",
      "min": 5,
      "max": 50,
      "step": 1,
      "value": 18,
      "unit": "cm"
},
      {
      "key": "lamp",
      "part": "lamp",
      "label": "Lámpara encendida",
      "type": "toggle",
      "value": true
},
      {
      "key": "threshold",
      "part": "ldr",
      "label": "Umbral de oscuridad",
      "type": "range",
      "min": 50,
      "max": 1000,
      "step": 10,
      "value": 400
},
    ],
    code: "const int SENSOR = A0;\nconst int LED = 9;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  int light = analogRead(SENSOR);  // more light = higher\n  Serial.println(light);\n\n  if (light < {{threshold}}) {\n    digitalWrite(LED, HIGH);  // dark: night light on\n  } else {\n    digitalWrite(LED, LOW);\n  }\n  delay(100);\n}",
    callouts: [
      {"anchor": "part:led", "icon": "led", "title": "Luz nocturna", "body": "Se activa de manera autónoma cuando el entorno se oscurece.", "x": -162, "y": -350, "w": 252, "side": "bottom", "at": 200, "leg": 30, "ring": true},
      {"anchor": "part:ldr", "icon": "sun", "title": "Sensor LDR", "body": "Semiconductor fotosensible cuya resistencia disminuye con los fotones.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:A0", "icon": "wave", "wide": true, "title": "Pin analógico A0", "body": "Digitaliza la tensión intermedia producida por el divisor.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
      {"anchor": "part:lamp", "icon": "lamp", "title": "Fuente de luz", "body": "Enciéndela o arrástrala para iluminar o ensombrecer el sensor.", "x": 250, "y": 160, "w": 238, "side": "top", "at": 72, "leg": 40, "ring": true},
    ],
    sim: "light",
  },
  {
    id: "sensor",
    title: "Leer un sensor ultrasónico",
    cardTitle: "7. Leer un sensor",
    thumb: "sensor",
    heading: "Leer un sensor",
    lede: "El módulo ultrasónico HC-SR04 dispara ráfagas inaudibles de sonido y cronometra el eco reflejado. Con la velocidad de propagación del sonido se deduce la distancia exacta al objeto objetivo.",
    features: [
      ["wave", "Emite un pulso y mide la respuesta con <code>pulseIn()</code>"],
      ["ruler", "Cada 58 microsegundos de trayecto representan 1 cm"],
      ["car", "Intercambia obstáculos: diferentes superficies presentan diversa reflectividad acústica"],
    ],
    pinout: [
      ["5V", "VCC", "Alimentación estable de 5 V para el transmisor y receptor.", "#d64a3a"],
      ["GND", "GND", "Tierra común de referencia.", "#2f3547"],
      ["D9", "Trig (Disparo)", "Un pulso de 10 µs en nivel ALTO detona 8 ciclos ultrasónicos.", "#f0b53a"],
      ["D10", "Echo (Eco)", "Permanece en HIGH durante el tiempo que tarda la onda en ir y volver.", "#3fae6a"],
    ],
    example: [
      "El pin Trig recibe un pulso de 10 microsegundos para iniciar el tren de ondas ultrasónicas.",
      "El transductor acústico emite 8 ciclos a 40 kHz y simultáneamente coloca el pin Echo en nivel HIGH.",
      "<code>pulseIn(ECHO, HIGH)</code> contabiliza con precisión de microsegundos la duración del pulso recibido.",
      "Dividir el tiempo registrado entre 58 convierte la duración a centímetros (basado en los 343 m/s del sonido en aire).",
    ],
    specs: [
      ["Rango útil de medición", "2 cm – 400 cm"],
      ["Resolución de lectura", "≈ 3 mm"],
      ["Frecuencia operativa", "40 kHz ultrasónico"],
      ["Ángulo de cobertura", "≈ 15° cónico"],
      ["Consumo de corriente", "5 V, ≈ 15 mA en reposo"],
    ],
    params: [
      ...obstacleParams,
      {
      "key": "interval",
      "part": "sensor",
      "label": "Frecuencia de lectura",
      "type": "range",
      "min": 50,
      "max": 1000,
      "step": 50,
      "value": 100,
      "unit": "ms"
},
    ],
    code: "const int TRIG = 9;\nconst int ECHO = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(TRIG, OUTPUT);\n  pinMode(ECHO, INPUT);\n}\n\nvoid loop() {\n  digitalWrite(TRIG, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n\n  long cm = pulseIn(ECHO, HIGH) / 58;\n  Serial.println(cm);\n  delay({{interval}});\n}",
    callouts: [
      {"anchor": "part:sensor", "icon": "sensor", "wide": true, "title": "Sensor HC-SR04", "body": "Emite ondas a 40 kHz y calcula el tiempo de tránsito acústico.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D9", "icon": "pins", "title": "Pines Trig y Echo", "body": "El pin 9 dispara el tren de pulsos y el pin 10 recibe el eco reflejado.", "x": -162, "y": -350, "w": 262, "side": "bottom", "at": 70, "leg": 30, "ring": true},
      {"anchor": "pin:5V", "icon": "plug", "title": "5V y GND", "body": "Alimentación de potencia directa provista por la placa.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
      {"anchor": "part:obstacle", "icon": "car", "wide": true, "title": "Obstáculo dinámico", "body": "Haz clic para cambiar de objeto o arrástralo para alterar la distancia.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
    ],
    sim: "sensor",
  },
  {
    id: "sound",
    title: "Emitir sonido",
    cardTitle: "8. Emitir sonido",
    thumb: "buzzer",
    heading: "Emitir sonido",
    lede: "Un zumbador piezoeléctrico produce un clic mecánico cada vez que se invierte su polaridad. Oscilándolo cientos de veces por segundo se genera una nota musical: la instrucción <code>tone()</code> lo logra con precisión matemática.",
    features: [
      ["speaker", "Genera notas musicales mediante <code>tone(pin, Hz, ms)</code>"],
      ["console", "Almacena secuencias melódicas estructuradas en arreglos"],
      ["clock", "Haz clic en el zumbador para cambiar de canción o tempo"],
    ],
    pinout: [
      ["D8", "Zumbador (+)", "Señal conmutada a la frecuencia exacta de cada nota musical.", "#f0a53a"],
      ["GND", "Zumbador (−)", "Retorno de corriente hacia la línea de tierra.", "#2f3547"],
    ],
    example: [
      "El arreglo <code>melody</code> almacena las frecuencias fundamentales en hercios (262 Hz corresponde al Do central).",
      "<code>tone(BUZZER, hz, ms)</code> modula una onda cuadrada en el pin especificado durante <code>ms</code> milisegundos.",
      "La pausa <code>delay</code> posterior crea una pequeña articulación silente entre notas repetidas para que no se fundan.",
      "Tras completar la secuencia melódica, el bucle pausa durante un segundo antes de reiniciar la reproducción.",
    ],
    specs: [
      ["Transductor acústico", "Piezoeléctrico pasivo, 12 mm"],
      ["Rango de frecuencias", "≈ 100 Hz – 10 kHz"],
      ["Do central (C4)", "262 Hz"],
      ["La de afinación (A4)", "440 Hz"],
      ["Distinción técnica", "Un zumbador activo oscila internamente y solo emite un tono fijo"],
    ],
    params: [
      {
        key: "melody",
        part: "buzzer",
        label: "Melodía",
        type: "choice",
        value: "twinkle",
        options: [
          {
            value: "scale",
            label: "Escala",
            note: "Do mayor, una octava completa.",
            code: { notes: formatMelody(melodies.scale, 4) },
          },
          {
            value: "twinkle",
            label: "Estrellita",
            note: "Estrellita, ¿dónde estás? (Twinkle, twinkle).",
            code: { notes: formatMelody(melodies.twinkle, 7) },
          },
          {
            value: "ode",
            label: "Himno a la Alegría",
            note: "Novena Sinfonía de Beethoven, frase principal.",
            code: { notes: formatMelody(melodies.ode, 5) },
          },
        ],
      },
      {
      "key": "note",
      "part": "buzzer",
      "label": "Duración de nota",
      "type": "range",
      "min": 80,
      "max": 500,
      "step": 10,
      "value": 220,
      "unit": "ms"
},
      {
      "key": "volume",
      "part": "buzzer",
      "label": "Volumen del altavoz",
      "type": "range",
      "min": 0,
      "max": 100,
      "step": 5,
      "value": 40,
      "unit": "%"
},
    ],
    code: "const int BUZZER = 8;\n{{melody.notes}}\nconst int N = sizeof(melody) / sizeof(int);\n\nvoid setup() {}\n\nvoid loop() {\n  for (int i = 0; i < N; i++) {\n    tone(BUZZER, melody[i], {{note}});\n    delay({{note}} + 50);\n  }\n  delay(1000);\n}",
    callouts: [
      {"anchor": "part:buzzer", "icon": "speaker", "title": "Zumbador pasivo", "body": "Una membrana cerámica vibra según las señales eléctricas aplicadas.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D8", "icon": "pin", "title": "Pin de audio D8", "body": "<code>tone()</code> oscila este pin a frecuencias audibles exactas.", "x": -162, "y": -350, "w": 262, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:GND", "icon": "ground", "title": "Terminal de masa", "body": "Cierra el circuito electroacústico hacia la tierra de la placa.", "x": -498, "y": -330, "w": 226, "side": "right", "at": 46, "leg": 30, "ring": true},
      {"anchor": "mcu", "icon": "chip", "title": "Temporizador MCU", "body": "Un timer por hardware asegura una frecuencia y tono afinados.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
    ],
    sim: "sound",
  },
  {
    id: "motor",
    title: "Controlar un motor",
    cardTitle: "9. Controlar un motor",
    thumb: "motor",
    heading: "Controlar un motor",
    lede: "Un microcontrolador no puede alimentar directamente la bobina de un motor por demanda de corriente; un transistor Darlington asume la potencia. La modulación PWM conmuta la alimentación a alta frecuencia para gobernar la velocidad de giro.",
    features: [
      ["pwm", "Regulación de velocidad de 0 a 255 con <code>analogWrite()</code>"],
      ["transistor", "El transistor TIP120 conmuta la corriente principal de potencia"],
      ["motor", "Haz clic en el motor para configurar la rampa de aceleración"],
    ],
    pinout: [
      ["~D6", "1 kΩ → Base", "Señal de control PWM generada por el programa.", "#ef8a3a"],
      ["5V", "Motor (+)", "Línea de alimentación de potencia para el motor DC.", "#d64a3a"],
      ["—", "Motor (−) → Colector", "El transistor actúa como interruptor cerrando el circuito hacia tierra.", "#2f3547"],
      ["GND", "Emisor", "Conexión a tierra común compartida del sistema.", "#2f3547"],
    ],
    example: [
      "<code>analogWrite(MOTOR, s)</code> fija el ciclo de trabajo PWM: 0 mantiene el motor frenado y 255 entrega el 100% de potencia.",
      "El bucle <code>for</code> incrementa progresivamente la variable <code>s</code> cada 40 ms para producir una aceleración progresiva y suave.",
      "Tras sostener la velocidad punta, emitir un valor de 0 interrumpe la conducción del transistor permitiendo desacelerar por inercia.",
      "Los pines marcados con una tilde (~) en la serigrafía (3, 5, 6, 9, 10, 11) integran modulación PWM por hardware.",
    ],
    specs: [
      ["Motor", "DC 3–6 V, consumo nominal ~200 mA"],
      ["Transistor de potencia", "Darlington TIP120 (capacidad hasta 5 A)"],
      ["Resistencia de base", "1 kΩ (marrón-negro-rojo) para saturación segura"],
      ["Frecuencia PWM pin 6", "≈ 980 Hz"],
      ["Protección indispensable", "Diodo de protección flyback en antiparalelo con los bornes inductivos"],
    ],
    params: [
      {
      "key": "top",
      "part": "motor",
      "label": "Velocidad máxima",
      "type": "range",
      "min": 50,
      "max": 255,
      "step": 5,
      "value": 255
},
      {
      "key": "step",
      "part": "motor",
      "label": "Paso de rampa",
      "type": "range",
      "min": 1,
      "max": 25,
      "step": 1,
      "value": 5
},
    ],
    code: "const int MOTOR = 6;  // PWM pin\n\nvoid setup() {\n  pinMode(MOTOR, OUTPUT);\n}\n\nvoid loop() {\n  for (int s = 0; s <= {{top}}; s += {{step}}) {\n    analogWrite(MOTOR, s);\n    delay(40);\n  }\n  delay(1500);\n  analogWrite(MOTOR, 0);\n  delay(1500);\n}",
    callouts: [
      {"anchor": "part:transistor", "icon": "transistor", "title": "Transistor de potencia", "body": "Una mínima corriente en la base gobierna la corriente pesada del motor.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "part:r1k", "icon": "resistor", "wide": true, "title": "Resistencia de 1 kΩ", "body": "Limita la corriente de base protegiendo el pin de salida del micro.", "x": 26, "y": -350, "w": 248, "side": "bottom", "at": 190, "leg": 30, "ring": true},
      {"anchor": "pin:D6", "icon": "pwm", "wide": true, "title": "Pin ~6 (PWM)", "body": "<code>analogWrite()</code> modula la potencia efectiva entregada (0–255).", "x": -300, "y": -350, "w": 260, "side": "bottom", "at": 230, "leg": 30, "ring": true},
      {"anchor": "part:motor", "icon": "motor", "wide": true, "title": "Motor de corriente continua", "body": "Haz clic para calibrar la rampa de velocidad y el régimen máximo.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
    ],
    sim: "motor",
  },
  {
    id: "servo",
    title: "Mover un servomotor",
    cardTitle: "10. Mover un<br />servomotor",
    thumb: "servo",
    heading: "Mover un servomotor",
    lede: "Un servomotor es un actuador con control de lazo cerrado y sensor de posición. Al ordenarle un ángulo entre 0° y 180°, gira hasta la posición indicada y la mantiene con firmeza; esencial en robótica, direccionamiento y maquetas.",
    features: [
      ["servo", "Control angular directo con <code>arm.write(angulo)</code>"],
      ["console", "La biblioteca oficial Servo sintetiza el tren de pulsos PPM"],
      ["clock", "Haz clic en el servo para ajustar el rango de barrido y velocidad"],
    ],
    pinout: [
      ["GND", "Cable marrón", "Referencia a tierra (GND).", "#7a5034"],
      ["5V", "Cable rojo", "Línea de alimentación continua de 5 V.", "#d64a3a"],
      ["D9", "Cable naranja", "Canal de señal: pulsos modulados de 1–2 ms cada 20 ms (50 Hz).", "#f0a53a"],
    ],
    example: [
      "<code>#include &lt;Servo.h&gt;</code> importa las rutinas de temporización y <code>Servo arm;</code> declara el objeto actuador.",
      "<code>arm.attach(9)</code> inicializa la modulación periódica de posición sobre el pin digital 9.",
      "El primer bucle <code>for</code> incrementa el ángulo grado por grado; el bucle complementario ejecuta el retorno inverso.",
      "El parámetro <code>delay</code> ajusta la velocidad angular: una menor espera genera un movimiento más ágil e instantáneo.",
    ],
    specs: [
      ["Servomotor", "Micro SG90 con engranajes plásticos, masa 9 g"],
      ["Recorrido angular", "Rango de 0° a 180°"],
      ["Velocidad de respuesta", "≈ 0.1 s para recorrer 60°"],
      ["Torque mecánico", "1.8 kg·cm a tensión nominal de 4.8 V"],
      ["Protocolo de control", "Frecuencia de 50 Hz con pulsos entre 0.5 ms y 2.4 ms"],
    ],
    params: [
      {
      "key": "from",
      "part": "servo",
      "label": "Ángulo inicial",
      "type": "range",
      "min": 0,
      "max": 175,
      "step": 5,
      "value": 0,
      "unit": "°"
},
      {
      "key": "to",
      "part": "servo",
      "label": "Ángulo final",
      "type": "range",
      "min": 5,
      "max": 180,
      "step": 5,
      "value": 180,
      "unit": "°"
},
      {
      "key": "wait",
      "part": "servo",
      "label": "Espera por paso",
      "type": "range",
      "min": 2,
      "max": 40,
      "step": 1,
      "value": 12,
      "unit": "ms"
},
    ],
    code: "#include <Servo.h>\nServo arm;\n\nvoid setup() {\n  arm.attach(9);\n}\n\nvoid loop() {\n  for (int a = {{from}}; a <= {{to}}; a++) {\n    arm.write(a);\n    delay({{wait}});\n  }\n  for (int a = {{to}}; a >= {{from}}; a--) {\n    arm.write(a);\n    delay({{wait}});\n  }\n}",
    callouts: [
      {"anchor": "part:servo", "icon": "servo", "title": "Servomotor SG90", "body": "Haz clic para definir los límites angulares y velocidad del movimiento.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:D9", "icon": "pwm", "wide": true, "title": "Pin de señal D9", "body": "El ancho del pulso transmitido define la posición angular del eje.", "x": -162, "y": -350, "w": 250, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "pin:5V", "icon": "plug", "title": "Alimentación 5V y GND", "body": "Cables rojo y marrón para alimentar el motorreductor interno.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
    ],
    sim: "servo",
  },
  {
    id: "project",
    title: "Construir un proyecto: Sensor de aparcamiento",
    cardTitle: "11. Construir un<br />proyecto",
    thumb: "gears",
    heading: "Sensor de aparcamiento",
    lede: "Integración completa de conceptos: el sensor ultrasónico vigila la aproximación de un vehículo y un módulo semáforo tricolor asiste visualmente indicando cuándo parar. Haz clic en el semáforo para graduar los umbrales de proximidad.",
    features: [
      ["logic", "Control de flujo condicional evaluando comparaciones lógicas directas"],
      ["lights", "Tres salidas digitales independientes para cada diodo del semáforo"],
      ["sensor", "Reutilización del algoritmo de telemetría acústica de la lección 7"],
    ],
    pinout: [
      ["5V · GND", "Alimentación unificada", "Línea de 5 V compartida y bus GND puenteado hacia el módulo semáforo.", "#d64a3a"],
      ["D9 · D10", "Trig · Echo", "Mismas conexiones de control ultrasónico vistas en la lección 7.", "#3d6fc4"],
      ["D4", "LED Rojo", "Se ilumina cuando el obstáculo ingresa en la zona de riesgo crítico.", "#ee7f62"],
      ["D3", "LED Amarillo", "Se activa a distancia intermedia como señal de advertencia preventiva.", "#f0b53a"],
      ["D2", "LED Verde", "Permanece encendido mientras la distancia sea segura y despejada.", "#3fae6a"],
    ],
    example: [
      "El ciclo de ejecución calcula la distancia en centímetros replicando fielmente el procedimiento de la lección 7.",
      "Una expresión booleana como <code>cm &gt; 30</code> evalúa intrínsecamente a verdadero (1) o falso (0).",
      "Pasar directamente el resultado de la comparación a <code>digitalWrite()</code> controla cada luz de forma concisa sin anidar bloques <code>if</code>.",
      "Dado que las condiciones son mutuamente excluyentes, en todo momento permanecerá activo un único indicador luminoso.",
    ],
    specs: [
      ["Componentes", "Arduino Uno, sensor HC-SR04 y módulo semáforo LED de 3 luces"],
      ["Conexiones", "8 cables puente (jumper) en protoboard"],
      ["Umbrales de distancia", "Totalmente parametrizables en tiempo real"],
      ["Cadencia de muestreo", "≈ 15 mediciones por segundo"],
      ["Propuesta de ampliación", "Integrar el zumbador de la lección 8 para señalización acústica proporcional"],
    ],
    params: [
      ...obstacleParams,
      {
      "key": "far",
      "part": "lights",
      "label": "Zona verde a más de",
      "type": "range",
      "min": 10,
      "max": 50,
      "step": 1,
      "value": 30,
      "unit": "cm"
},
      {
      "key": "near",
      "part": "lights",
      "label": "Zona roja a menos de",
      "type": "range",
      "min": 3,
      "max": 45,
      "step": 1,
      "value": 15,
      "unit": "cm"
},
    ],
    code: "const int TRIG = 9, ECHO = 10;\nconst int RED = 4, YLW = 3, GRN = 2;\n\nvoid setup() {\n  pinMode(TRIG, OUTPUT);\n  pinMode(ECHO, INPUT);\n  for (int p = 2; p <= 4; p++)\n    pinMode(p, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(TRIG, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n  long cm = pulseIn(ECHO, HIGH) / 58;\n\n  digitalWrite(GRN, cm > {{far}});\n  digitalWrite(YLW, cm > {{near}} && cm <= {{far}});\n  digitalWrite(RED, cm <= {{near}});\n  delay(60);\n}",
    callouts: [
      {"anchor": "part:sensor", "icon": "sensor", "wide": true, "title": "Sensor de proximidad", "body": "Rastrea continuamente la distancia física hacia el obstáculo objetivo.", "x": 0, "y": -350, "w": 250, "side": "bottom", "at": 200, "leg": 30, "ring": true},
      {"anchor": "part:lights", "icon": "lights", "title": "Semáforo visual", "body": "Haz clic para redefinir los umbrales de proximidad de cada color.", "x": 290, "y": -350, "w": 238, "side": "bottom", "at": 40, "leg": 30, "ring": true},
      {"anchor": "mcu", "icon": "logic", "title": "Lógica booleana", "body": "Evaluaciones matemáticas directas conmutan la luz correspondiente.", "x": -498, "y": 130, "w": 250, "side": "top", "at": 150, "leg": 40, "ring": true},
      {"anchor": "part:obstacle", "icon": "car", "wide": true, "title": "Vehículo / Objeto", "body": "Acércalo o aléjalo para observar la transición luminosa en tiempo real.", "x": 270, "y": 160, "w": 238, "side": "left", "at": 46, "leg": 40, "ring": true},
    ],
    sim: "project",
  },
  {
    id: "esp32",
    title: "Conoce el ESP32: El salto a Wi-Fi e IoT",
    cardTitle: "12. Conoce el<br />ESP32",
    thumb: "esp32",
    heading: "ESP32 DevKit V1",
    lede: "El ESP32 es el hermano mayor y conectado del Arduino Uno: procesador dual-core a 240 MHz de 32 bits, Wi-Fi y Bluetooth nativos. Observa ambas placas lado a lado y descubre el salto cualitativo hacia el Internet de las Cosas (IoT).",
    features: [
      ["chip", "Procesador dual-core Xtensa 32-bit @ 240 MHz (vs 16 MHz del Uno)"],
      ["bulb", "Conectividad inalámbrica Wi-Fi 802.11 b/g/n y Bluetooth 4.2 BLE"],
      ["gear", "520 KB de SRAM y 4 MB de memoria Flash (vs 2 KB y 32 KB del Uno)"],
    ],
    pinout: [
      ["D23 · D22 · D21", "GPIO / I²C", "Pines digitales multipropósito y bus I²C nativo.", "#2a56a3"],
      ["TX0/RX0 · TX2/RX2", "UART Serial", "Dos interfaces seriales por hardware independientes.", "#1aa3a1"],
      ["D34 · D35 · VN · VP", "Solo Entrada", "Entradas analógicas/digitales sin resistencias de pull-up.", "#d64a3a"],
      ["TOUCH 0–9", "Sensor capacitivo", "10 pines con detección táctil sin componentes externos.", "#8a63c9"],
      ["3V3 · VIN · GND", "Alimentación", "Lógica nativa a 3.3 V; regulador AMS1117 para entrada 5 V.", "#2f3547"],
      ["EN · BOOT", "Arranque y Reset", "EN reinicia la CPU; BOOT activa modo de descarga en ROM.", "#8e9094"],
    ],
    example: [
      "El ESP32 es 100% compatible con el IDE y las librerías de Arduino.",
      "La librería nativa <code>WiFi.h</code> permite conectar la placa a tu red local en solo tres líneas de código.",
      "A diferencia de los 5 V del Arduino Uno, las entradas y salidas del ESP32 operan a <b>3.3 V</b>.",
      "Presiona <b>Ejecutar programa</b> para ver la secuencia de inicialización del microcontrolador y la conexión Wi-Fi en el monitor serial.",
    ],
    specs: [
      ["Microcontrolador", "Espressif ESP-WROOM-32 (Xtensa Dual-Core 32-bit)"],
      ["Frecuencia de reloj", "240 MHz (hasta 600 DMIPS)"],
      ["Memoria SRAM", "520 KB internos"],
      ["Memoria Flash", "4 MB SPI externa"],
      ["Tensión lógica", "3.3 V (requiere divisor resistivo para señales de 5V)"],
      ["Conectividad inalámbrica", "Wi-Fi 802.11 b/g/n (150 Mbps) + Bluetooth v4.2 BR/EDR y BLE"],
      ["Canales ADC", "18 canales ADC de 12 bits (rango 0–4095)"],
      ["Salidas DAC", "2 canales DAC de 8 bits para señales analógicas puras"],
    ],
    code: "#include <WiFi.h>\n\nconst char* ssid = \"Laboratorio-IoT\";\nconst char* password = \"clave_secreta\";\nconst int LED_PIN = 2;\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(LED_PIN, OUTPUT);\n\n  Serial.println(\"Iniciando ESP32 DevKit V1...\");\n  WiFi.begin(ssid, password);\n\n  while (WiFi.status() != WL_CONNECTED) {\n    delay(300);\n    Serial.print(\".\");\n  }\n\n  Serial.println(\"\\nWiFi Conectado!\");\n  Serial.print(\"IP asignada: \");\n  Serial.println(WiFi.localIP());\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(500);\n  digitalWrite(LED_PIN, LOW);\n  delay(500);\n}",
    callouts: [
      {"anchor": "part:esp32", "icon": "chip", "wide": true, "title": "ESP32 DevKit V1", "body": "Microcontrolador de 32 bits con Wi-Fi, Bluetooth y antena MIFA integrada.", "x": 280, "y": -330, "w": 260, "side": "bottom", "at": 140, "leg": 35, "ring": true},
      {"anchor": "mcu", "icon": "chip", "title": "Arduino Uno R3", "body": "Compara: 8 bits vs 32 bits, 16 MHz vs 240 MHz, 2 KB vs 520 KB RAM.", "x": -260, "y": -340, "w": 260, "side": "bottom", "at": 90},
      {"anchor": "digital", "icon": "pins", "title": "Interconexión Serial", "body": "Líneas de 5V (rojo), GND (azul marino) y datos D2 (azul) comunicando ambas placas.", "x": 40, "y": 140, "w": 260, "side": "top", "at": 120, "leg": 40, "ring": true},
    ],
    sim: "esp32",
  },
];

/**
 * Obtiene los valores iniciales por defecto de los parámetros de una lección.
 * @param {object} lesson - Lección seleccionada.
 * @returns {Record<string, any>} Mapa clave-valor de parámetros.
 */
export function getLessonParamDefaults(lesson) {
  return Object.fromEntries((lesson.params ?? []).map((p) => [p.key, p.value]));
}

/**
 * Resuelve e interpola las variables dinámicas de los parámetros dentro del código C++.
 * @param {object} lesson - Lección seleccionada con su plantilla de código.
 * @param {Record<string, any>} paramValues - Valores actuales de los parámetros interactivos.
 * @returns {string} Código fuente final de Arduino listo para mostrar/ejecutar.
 */
export function renderLessonCode(lesson, paramValues) {
  let code = lesson.code.replace(
    /\{\{(\w+)\.(\w+)\}\}/g,
    (_, key, prop) =>
      lesson.params
        ?.find((p) => p.key === key)
        ?.options?.find((o) => o.value === paramValues[key])?.code?.[prop] ?? ""
  );
  return code.replace(/\{\{(\w+)\}\}/g, (_, key) => String(paramValues[key] ?? ""));
}

