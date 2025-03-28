import { Component, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  @ViewChild('cv', { static: false }) cv!: ElementRef;

  showModal: boolean = false; // Modal de bienvenida
  title = 'Mi Portafolio - Darley A. Evangelista Saavedra';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Verificamos si ya se mostró el modal de bienvenida
      const modalShown = sessionStorage.getItem('modalShown');
      if (!modalShown) {
        // Primera vez en esta sesión
        this.showModal = true;
        sessionStorage.setItem('modalShown', 'true');
        this.lanzarConfeti(); // Efecto confeti
      }
    }
  }

  closeModal() {
    // Cerrar el modal
    this.showModal = false;
    // Indicar que el modal de CV ya se cerró
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('cvModalClosed', 'true');
      document.dispatchEvent(new CustomEvent('modalClosed'));
    }
  }

  lanzarConfeti() {
    const duration = 3000; // Duración total en milisegundos
    const animationEnd = Date.now() + duration;
    const colors = [
      '#ff0a54', '#ff477e', '#ff7096', '#ff85a1',
      '#fbb1bd', '#85e3ff', '#b5c0ff', '#8093f1'
    ];

    // Crear canvas
    const existingCanvas = document.getElementById('confetti-canvas');
    if (existingCanvas) {
      document.body.removeChild(existingCanvas);
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    const confettiFrame = () => {
      myConfetti({
        particleCount: 7,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: colors,
        startVelocity: 30,
        ticks: 200,
        gravity: 0.5,
      });
      myConfetti({
        particleCount: 7,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: colors,
        startVelocity: 30,
        ticks: 200,
        gravity: 0.5,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(confettiFrame);
      } else {
        setTimeout(() => {
          document.body.removeChild(canvas);
        }, 3000);
      }
    };
    confettiFrame();
  }

  descargarPDF() {
    if (!this.cv) return;
    const cvElement = this.cv.nativeElement;
    const year = new Date().getFullYear();

    html2canvas(cvElement, {
      scale: 2,
      windowHeight: 297 * 4,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`CurriculumVitae_EVANGELISTA_SAAVEDRA_DARLEY_A_${year}.pdf`);
    });
  }
  
  contacto = {
    telefono: '+51 927 615 506',
    email: 'darleysaavedra@gmail.com',
    linkedin: 'https://www.linkedin.com/in/darley-a-evangelista-saavedra-09a674171/',
    direccion: 'Av 5 de abril Pesqueda II, Trujillo, Perú'
  };

  habilidades = [
    'Dominio de bases de datos: SQL Server, MySQL, MongoDB, Oracle, PostgreSQL',
    'Virtualización: VMware, VirtualBox, Hyper-V.',
    'Sistemas Operativos: Windows, Linux, y administración de servidores Windows Server.',
    'Métodos ágiles: Scrum, Kanban y ciclo de vida del desarrollo de software.',
    'Automatización y Scripting: Uso de PowerShell, Bash, Python para automatizar tareas.',
    'Pensamiento lógico y algorítmico',
    'Diagnóstico y solución de fallos',
    'Creatividad e innovación',
    'Autodidacta y aprendizaje continuo',
    'Comunicación efectiva',
    'Ética profesional, responsabilidad y compromiso con el trabajo.',
    'Trabajo en equipo y actitud proactiva.'
  ];

  educacion = [
    "Facturación electrónica - En Proceso",
    "Máster Oracle DBA+ - Udemy",
    "Ing. Comput. y Sist. - UPAO (2015-2020)"
  ];

  experiencia = [
    {
      cargo: 'DESARROLLADOR EN VB.NET | Locador',
      empresa: 'RAPI SISTEMA SAC',
      fecha: 'SEPTIEMBRE - DICIEMBRE 2024',
      detalles: [
        'Módulo de Reportes',
        'Módulo de Permisos de horario: Sin acceso, Acceso todo el día y por Rango de horas',
        'Modulo de Mantenedor de Reportes: Crystal Report y DataSet',
        'Scripts: vistas, procedimientos almacenados en SQL Server',
      ],
    },
    {
      cargo: 'DOCENTE',
      empresa: 'INST. EDUC. SUP. TECN. PUBLICO "LAREDO"',
      fecha: 'JUNIO - DICIEMBRE 2024',
      detalles: [
        'Curso de Sistemas Operativos',
        'Curso de Soporte Técnico',
        'Curso de Lógica Computacional',
        'Curso de Virtualización de Aplicaciones',
        'Curso de Software Servidor de Red',
        'Curso de Negocios Electrónicos',
        'Asesor de Informe de Títulación: Herramientas de diseño gráfico a la publicidad digital',
      ],
    },
    {
      cargo: 'ASISTENTE DE BASE DE DATOS',
      empresa: 'UNIVERSIDAD PRIVADA ANTENOR ORREGO',
      fecha: 'ENERO - ABRIL 2024',
      detalles: [
        'Automatización de monitoreo de JOBS con Python, oracle client y crontab',
        'Monitoreo de procesos en PROD y UPROD en Oracle Developer',
        'Monitoreo de espacio de las instancias PROD y UPROD',
        'Consultas y subconsultas para reporte de ingresantes, matriculas, egresados, titulados',
        'Automatización de monitoreo de tablespaces de PROD y UPROD (Python, oracle client y crontab)',
        'Monitoreo de backup automatizado por Veeam Backup nivel 0 y 1.',
        'Instalacion y configuracion de Zabbix server para el monitoreo de espacio de las unidades de almacenamiento en Centos 7.',
        'Automatización de copia de seguridad con python y crontab',
      ],
    },
    {
      cargo: 'INFORMÁTICO FARMACIA-SISMED | Locador',
      empresa: 'RED DE SALUD GRAN CHIMÚ"',
      fecha: 'FEBRERO - NOVIEMBRE 2023',
      detalles: [
        'Generar ICI Mensual y verificar saldos negativos en el stock final de cada medicamento.',
        'Reporte de medicamentos por mes en SQL SERVER.',
        'Visualización de indicadores en Power BI, disponibilidad, ventas, promedio de consumo.',
        'Asistencia tecnica en el sistema de informacion SISMED en los establecimientos de salud.',
      ],
    },
    {
      cargo: 'ASISTENTE/AUXILIAR DE SISTEMAS',
      empresa: 'RED DE SALUD GRAN CHIMÚ',
      fecha: 'AGOSTO 2021 - ENERO 2023',
      detalles: [
        'Brindar soporte de instalación e incidencias a los usuarios en: SISMED, SIEN ACREDITACIÓN, SIGA, SIAF (cliente).',
        'Cableado de la red en los nuevos puntos.',
        'Desarrollo y soporte en la Portal web de la institución.',
        'Instalación de reloj biométrico para la asistencia del personal de Salud.',
        'Desarrollo de un sistema web versión beta para el Hospital de Cascas (SISTEMA DE CITAS MEDICAS)',
        'Gestionar usuarios para la firma digital.',
      ],
    },
    {
      cargo: 'PRACTICANTE PROFESIONAL',
      empresa: 'SUNARP TRUJILLO',
      fecha: 'MARZO - AGOSTO 2021',
      detalles: [
        'Soporte técnico a nivel de software (Unidad de Registro, Vehículo y Registro de Propiedad) y hardware.',
        'Actualización de la Visualización de partidas.',
        'Configuración de IPs y dominios en nuevos equipos informáticos.',
        'Gestión de las hojas de salida.',
        'Administración de usuarios y archivos en la red de dominio.',
      ],
    },
  ];
}
