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
  //private terminosValidos: string[] = ['hola', 'cómo estás', 'adiós', 'servicio', 'proyecto', 'certificación', 'creador', 'desarrolló'];
  private terminosValidos: string[] = [
    // Saludos
    'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'cómo estás', 'saludos',
  
    // Despedidas
    'adiós', 'hasta luego', 'chau', 'nos vemos', 'bye', 'me voy', 'gracias, hasta pronto',
  
    // Preguntas sobre el chatbot
    'quién eres', 'qué haces', 'para qué sirves', 'cómo me puedes ayudar', 'quién te creó', 
    'eres un robot', 'eres humano', 'cómo te llamas', 'cuál es tu nombre',
  
    // Información general
    'qué es', 'cómo funciona', 'cómo se usa', 'para qué sirve', 'definición de', 
    'qué significa', 'explicación de', 'ayuda', 'información', 'ejemplo de',
  
    // Soporte técnico
    'soporte', 'error', 'no funciona', 'problema', 'reporte de error', 
    'cómo solucionar', 'se cayó el sistema', 'ayuda técnica', 'mi cuenta no abre', 'bug', 'fallo',
  
    // Consultas sobre servicios y productos
    'servicio', 'producto', 'proyecto', 'certificación', 'stock', 'disponibilidad', 
    'características', 'especificaciones', 'diferencias', 'comparación', 'mejor opción', 'recomendación',
  
    // Preguntas sobre compras y pagos
    'precio', 'cuánto cuesta', 'formas de pago', 'tarjeta de crédito', 'descuento', 'promoción', 
    'envío', 'factura', 'reembolso', 'devolución', 'compra', 'pedido', 'cancelar pedido', 'cuánto vale',
  
    // Cuentas y accesos
    'cuenta', 'registrarme', 'crear cuenta', 'olvidé mi contraseña', 'cómo recuperar mi cuenta', 
    'cómo cambiar mi contraseña', 'no puedo entrar', 'error de login', 'eliminar cuenta', 'usuario',
  
    // Conversación informal
    'cómo estás', 'qué haces', 'cuál es tu nombre', 'de dónde eres', 'qué día es hoy', 
    'cuéntame un chiste', 'háblame de algo interesante', 'cuál es tu película favorita', 
    'te gusta la música', 'dime algo divertido',
  
    // Horarios y disponibilidad
    'horario de atención', 'están abiertos', 'a qué hora abren', 'cuándo cierran', 
    'tienen atención los fines de semana', 'cuándo puedo contactarlos',
  
    // Preguntas sobre tecnología
    'qué es inteligencia artificial', 'qué es un chatbot', 'qué significa machine learning', 
    'qué es programación', 'cómo aprender a programar', 'qué lenguaje de programación me recomiendas',
  
    // Preguntas sobre negocios y emprendimiento
    'cómo iniciar un negocio', 'consejos para emprendedores', 'qué es marketing digital', 
    'cómo vender por internet', 'qué es e-commerce',
  
    // Preguntas de entretenimiento
    'qué series recomiendas', 'qué películas están en tendencia', 'qué libros leer', 
    'cuál es la mejor película del año',
  
    // Otras preguntas comunes
    'cómo puedo contactarlos', 'dónde están ubicados', 'cuál es su número de teléfono', 
    'cómo hablo con un humano', 'puedo hablar con un asesor', 'tienen atención personalizada',
  
    // Preguntas sobre el creador
    'creador', 'quién desarrolló este chatbot', 'quién te programó',

    // Preguntas sobre certificados
    'certificados', 'tienes certificados?', '¿Tienes certificados?'
  ];
  

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

    // Respuestas personalizadas para términos válidos
    switch (mensajeCorregido) {
        // Saludos y despedidas
        case 'hola':
        case 'buenos días':
        case 'buenas tardes':
        case 'buenas noches':
        case 'qué tal':
            return '¡Hola! ¿En qué puedo ayudarte?';

        case 'cómo estás':
            return 'Estoy bien, gracias por preguntar. ¿Y tú?';

        case 'adiós':
        case 'hasta luego':
        case 'chau':
        case 'bye':
            return '¡Hasta luego! Si necesitas más ayuda, estaré aquí.';

        // Preguntas sobre el chatbot
        case 'quién eres':
        case 'para qué sirves':
            return 'Soy un asistente virtual diseñado para ayudarte con tus consultas. ¿En qué puedo asistirte hoy?';

        case 'quién te creó':
        case 'eres un robot':
        case 'eres humano':
            return 'Soy un chatbot creado por Darley, programado para responder tus preguntas.';

        // Información sobre el portafolio
        case 'portafolio':
        case 'trabajos':
        case 'proyectos':
            return 'Mi portafolio digital incluye proyectos desarrollados, los cuales están alojados en mi repositorio de GitHub. Puedes verlos en mi sitio web.';

        case 'certificados':
        case 'tienes certificados?':  
            return 'En mi portafolio puedes ver los certificados de los cursos que he realizado, todos los cuales están disponibles en línea.';

        case 'cv':
        case 'currículum':
            return 'Tengo mi CV disponible en dos formatos: uno tradicional y otro en el formato Harvard. Puedes consultarlos en mi sitio web también.';

        // Información general
        case 'qué es':
        case 'cómo funciona':
        case 'cómo se usa':
            return 'Depende del contexto. ¿Sobre qué te gustaría saber más?';

        // Soporte técnico
        case 'soporte':
        case 'error':
        case 'no funciona':
        case 'problema':
            return 'Lo siento por el inconveniente. ¿Podrías describirme más el problema para ayudarte mejor?';

        // Consultas sobre servicios y productos
        case 'servicio':
        case 'producto':
        case 'proyecto':
            return '¿Podrías darme más detalles sobre qué servicio o producto te interesa?';

        case 'certificación':
            return 'Las certificaciones pueden variar. ¿Sobre cuál necesitas información?';

        // Compras y pagos
        case 'precio':
        case 'cuánto cuesta':
            return 'Los precios pueden variar. ¿Sobre qué producto o servicio necesitas saber?';

        case 'formas de pago':
        case 'tarjeta de crédito':
            return 'Aceptamos varias formas de pago, incluyendo tarjetas de crédito y débito. ¿Necesitas más detalles?';

        case 'descuento':
        case 'promoción':
            return 'Actualmente tenemos algunas promociones disponibles. ¿Quieres más información sobre alguna en particular?';

        // Conversación informal
        case 'qué haces':
            return 'Estoy aquí para ayudarte a responder tus preguntas. ¿Cómo puedo asistirte?';

        case 'cuéntame un chiste':
            return '¡Claro! ¿Por qué los pájaros no usan WhatsApp? Porque ya tienen Twitter. 😆';

        // Horarios y disponibilidad
        case 'horario de atención':
        case 'están abiertos':
            return 'Nuestro horario de atención es de lunes a viernes de 9:00 a.m. a 6:00 p.m. ¿Necesitas ayuda con algo más?';

        // Preguntas sobre el creador
        case 'creador':
        case 'quién desarrolló este chatbot':
            return 'Fui desarrollado por Darley. Aún estoy en proceso de aprendizaje. 😊';

        default:
            return 'Disculpa, aún no entiendo esa consulta. Estoy en entrenamiento.';
    }
  }


  toggleChat(): void {
    // Aquí se alterna el estado del chat, pero esto solo abrirá o cerrará el chat cuando el usuario haga clic en el botón
    this.chatOpen = !this.chatOpen;
  }

  // Método para cerrar el chat específicamente al hacer clic en el botón de cierre
  closeChat(): void {
    this.chatOpen = false; // Solo se cierra cuando el usuario hace clic en el botón de cierre
  }

  // Enviar mensaje
  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage.toLowerCase();
    this.messages.push({ sender: 'Tú', text: `${this.userMessage}: <strong>Tú</strong>` });

    setTimeout(() => {
      const respuesta = this.getRespuesta(userText);
      this.messages.push({ sender: 'Asistente', text: `<strong>Asistente</strong>: ${respuesta}` });
    }, 500);

    this.userMessage = ''; // Limpia el input después de enviar el mensaje
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
