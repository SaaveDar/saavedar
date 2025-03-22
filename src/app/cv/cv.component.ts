import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cv',
 // standalone: true,
 // imports: [CommonModule], //RouterOutlet
 imports: [CommonModule, RouterModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent  {
  title = 'Mi Portafolio - Darley A. Evangelista Saavedra';

  @ViewChild('cv', { static: false }) cv!: ElementRef;

  descargarPDF() {
    const cvElement = this.cv.nativeElement;
    const year = new Date().getFullYear();
  
    html2canvas(cvElement, {
      scale: 2,
      windowHeight: 297 * 4, // Ajusta la altura para capturar toda la página A4
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Usa el tamaño exacto de A4
      pdf.save(`CurriculumVitae_EVANGELISTA SAAVEDRA, DARLEY A._${year}.pdf`);
    });
  }
  
  

  contacto = {
    telefono: '+51 927 615 506',
    email: 'darleysaavedra@gmail.com',
    linkedin: 'https://www.linkedin.com/in/darley-evangelista',
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
        'Curso de Redes de Computadoras',
      ],
    },
    {
      cargo: 'ASISTENTE DE BASE DE DATOS',
      empresa: 'INST. EDUC. SUP. TECN. PUBLICO "LAREDO"',
      fecha: 'ENERO - ABRIL 2024',
      detalles: [
        'Automatización de monitoreo de JOBS con Python, oracle client y crontab',
        'Monitoreo de procesos en PROD y UPROD en Oracle Developer',
        'Monitoreo de espacio de las instancias PROD y UPROD',
        'Consultas y subconsultas para reporte de ingresantes, matriculas, egresados, titulados',
        'Automatización de monitoreo de tablespaces de PROD y UPROD (Python, oracle client y crontab)',
        'Monitoreo de backup automatizado por Veeam Backup nivel 0 y 1.',
        'Instalacion  y  configuracion  de  Zabbix  server  para  el  monitoreo  de  espacio  de  las unidades de almacenamiento en Centos 7.',
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
        'Asistencia  tecnica  en  el  sistema  de  informacion  SISMED  en  los  establecimientos  de salud.',
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
