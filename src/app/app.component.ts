import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Importamos FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // <-- Agregamos FormsModule aquí
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
  chatOpen = false;
  userMessage = '';
  messages: { sender: string, text: string }[] = [];

  private respuestas: { [key: string]: string } = {
    'hola': '¡Hola! ¿En qué puedo ayudarte?',
    '¿cómo estás?': 'Estoy aquí para ayudarte. ¿En qué necesitas asistencia?',
    '¿qué servicios ofreces?': 'Ofrezco ayuda en desarrollo web, Angular, y bases de datos.',
    'adiós': '¡Hasta luego! Si necesitas más ayuda, estaré aquí.',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('modalClosed', () => {
        const navTourDone = sessionStorage.getItem('navTourDone');
        if (!navTourDone) {
          this.startNavTour();
        }
      });
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
  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage.toLowerCase();
    this.messages.push({ sender: 'Tú', text: this.userMessage });

    setTimeout(() => {
      const respuesta = this.respuestas[userText] || 'Aún no te entiendo.';
      this.messages.push({ sender: 'Asistente', text: respuesta });
    }, 500);

    this.userMessage = '';
  }
}
