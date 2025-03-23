import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    { id: 'navInicio', desc: 'Aquí encuentras una vista general de mi portafolio y podrás descargar en formato PDF.' },
    { id: 'navProyectos', desc: 'Mira mis proyectos más relevantes.' },
    { id: 'navCertificados', desc: 'Aquí verás mis cursos y certificaciones.' },
    { id: 'navCvHarvard', desc: 'Puedes descargar mi CV en formato Harvard.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Si estamos en el navegador, escuchamos el evento "modalClosed"
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('modalClosed', () => {
        const navTourDone = sessionStorage.getItem('navTourDone');
        // Solo iniciar si no se ha hecho el tour
        if (!navTourDone) {
          this.startNavTour();
        }
      });
    }
  }

  ngOnInit() {
    // Si quieres que se inicie el tour sin el evento, 
    // podrías verificar aquí si ya cerraron el modal:
    //
    // if (isPlatformBrowser(this.platformId)) {
    //   const navTourDone = sessionStorage.getItem('navTourDone');
    //   const cvModalClosed = sessionStorage.getItem('cvModalClosed');
    //   if (!navTourDone && cvModalClosed) {
    //     this.startNavTour();
    //   }
    // }
  }

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
}
