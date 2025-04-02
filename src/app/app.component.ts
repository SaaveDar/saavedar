import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importamos FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mi Portafolio - Darley A. Evangelista Saavedra';

  // TOUR DE NAVEGACIÓN (TOOLTIPS)
  navTourActive: boolean = false;
  currentNavStep: number = 0;
  tooltipStyle: any = {};
  navSteps = [
    { id: 'navInicio', desc: 'Aquí encuentras una vista general de mi CV Digital y podrás descargar en formato PDF.' },
    { id: 'navProyectos', desc: 'Mira mis proyectos más relevantes.' },
    { id: 'navCertificados', desc: 'Aquí verás mis cursos y certificaciones.' },
    { id: 'navCvHarvard', desc: 'Puedes descargar mi CV en formato Harvard.' },
  ];


  // CHATBOT PERSONALIZADO
  //chatOpen = false;
  chatOpen: boolean = false; // Estado inicial del chat
  userMessage = '';
  messages: { sender: string, text: string }[] = [];
 
  private respuestas: { [key: string]: string[] } = {};
  private terminosValidos: string[] = ['hola', 'cómo estás', 'adiós', 'servicio', 'proyecto', 'certificación', 'creador', 'desarrolló'];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarConocimientos();
    }
  }

  ngOnInit() {}

  // Métodos del Tour de Navegación
  startNavTour() {
    this.navTourActive = true;
    this.currentNavStep = 0;
    this.highlightNavStep();
  }

  highlightNavStep() {
    const step = this.navSteps[this.currentNavStep];
    const element = document.getElementById(step.id);
    if (!element) {
      this.nextNavStep();
      return;
    }
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX + rect.width + 10;
    this.tooltipStyle = {
      position: 'absolute',
      top: top + 'px',
      left: left + 'px'
    };
  }

  nextNavStep() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentNavStep++;
      if (this.currentNavStep >= this.navSteps.length) {
        this.navTourActive = false;
        sessionStorage.setItem('navTourDone', 'true');
      } else {
        this.highlightNavStep();
      }
    }
  }

  skipNavTour() {
    if (isPlatformBrowser(this.platformId)) {
      this.navTourActive = false;
      sessionStorage.setItem('navTourDone', 'true');
    }
  }

  // Métodos del Chatbot
  toggleChat(): void {
    this.chatOpen = !this.chatOpen; // Alterna entre abrir y cerrar
  }

  // Método para calcular la distancia de Levenshtein entre dos cadenas
  calcularLevenshtein(a: string, b: string): number {
    const tmp: number[][] = [];
    for (let i = 0; i <= a.length; i++) {
      tmp[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      tmp[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        tmp[i][j] = Math.min(
          tmp[i - 1][j] + 1, // eliminación
          tmp[i][j - 1] + 1, // inserción
          tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // sustitución
        );
      }
    }
    return tmp[a.length][b.length];
  }

  // Método para encontrar la palabra más cercana en las respuestas conocidas
  corregirPalabra(mensaje: string): string {
    let palabraCorregida = mensaje;
    let menorDistancia = Infinity;

    // Comprobamos si el mensaje tiene una corrección automática
    for (const termino of this.terminosValidos) {
      const distancia = this.calcularLevenshtein(mensaje, termino);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        palabraCorregida = termino;
      }
    }

    // Si la distancia es razonablemente baja, consideramos que la palabra fue mal escrita
    if (menorDistancia <= 3) {  // Ajusta este valor según lo que consideres aceptable
      return palabraCorregida;
    }

    return mensaje;
  }

  // Método para obtener una respuesta personalizada, considerando correcciones
  getRespuesta(mensaje: string): string {
    // Corregir el mensaje antes de intentar encontrar la respuesta
    const mensajeCorregido = this.corregirPalabra(mensaje.toLowerCase());

    // Responder con una respuesta personalizada para preguntas comunes como "Hola", "Cómo estás", etc.
    if (mensajeCorregido === 'hola') {
      return '¡Hola! ¿En qué puedo ayudarte?';
    }
    if (mensajeCorregido === 'cómo estás') {
      return 'Estoy bien y tú como estas?';
    }
    if (mensajeCorregido === 'adiós') {
      return '¡Hasta luego! Si necesitas más ayuda, estaré aquí.';
    }
    if (mensajeCorregido === 'creador') {
      return 'Mi creador es Darley, por lo cual estoy en entrenamiento.';
    }

    // Si el mensaje no coincide con ninguna palabra válida, responde con el mensaje de entrenamiento
    if (!this.terminosValidos.includes(mensajeCorregido)) {
      return 'Disculpe, aún no lo entiendo. Estoy en entrenamiento.';
    }

    // Si no se encuentra una respuesta, pregunta por la corrección y sugerir la correcta
    return this.sugerirCorreccion(mensajeCorregido);
  }

  // Modifica sendMessage para usar la función dinámica
  sendMessage() {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage.toLowerCase();
    this.messages.push({ sender: 'Tú', text: this.userMessage });

    setTimeout(() => {
      const respuesta = this.getRespuesta(userText);
      this.messages.push({ sender: 'Asistente', text: respuesta });
    }, 500);

    this.userMessage = '';
  }

  // Método para sugerir correcciones de forma automática y responder sin confirmación
  sugerirCorreccion(mensaje: string): string {
    // Corregir el mensaje automáticamente
    const mensajeCorregido = mensaje.charAt(0).toUpperCase() + mensaje.slice(1); // Capitalizar la primera letra

    // El asistente responde con la corrección ya aplicada
    return `Parece que quisiste decir "${mensajeCorregido}". ¡Ahora estoy listo para responder! ¿En qué más puedo ayudarte?`;
  }

  // Agrega una nueva respuesta y la guarda
  agregarRespuesta(pregunta: string, respuesta: string) {
    if (!this.respuestas[pregunta]) {
      this.respuestas[pregunta] = [];
    }
    this.respuestas[pregunta].push(respuesta);
    this.guardarConocimientos();
  }

  // Guarda las respuestas en LocalStorage
  private guardarConocimientos() {
    localStorage.setItem('chatbotData', JSON.stringify(this.respuestas));
  }

  // Carga respuestas previas desde LocalStorage
  private cargarConocimientos() {
    const datos = localStorage.getItem('chatbotData');
    if (datos) {
      this.respuestas = JSON.parse(datos);
    }
  }
}
