import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CvHarvardComponent } from './cv-harvard/cv-harvard.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppComponent,         // Importar en lugar de declarar
    ProyectosComponent,   // Importar en lugar de declarar
    CertificadosComponent,// Importar en lugar de declarar
    CvHarvardComponent    // Importar en lugar de declarar
  ],
 // bootstrap: [AppComponent]
})
export class AppModule { }
