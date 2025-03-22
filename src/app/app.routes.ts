//import { Routes } from '@angular/router';

//export const routes: Routes = [];



import { Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CvHarvardComponent } from './cv-harvard/cv-harvard.component';

export const routes: Routes = [
  { path: '', component: CvComponent }, // Página principal debe mostrar el CV
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'certificados', component: CertificadosComponent },
  { path: 'cv-harvard', component: CvHarvardComponent },
  { path: '**', redirectTo: '' } // Redirigir rutas desconocidas al CV
];
