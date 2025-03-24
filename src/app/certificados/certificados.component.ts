import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent {
  constructor(private cdRef: ChangeDetectorRef) { } // Agregar ChangeDetectorRef
  categorias = [
    {
      nombre: 'Análisis de Datos',
      certificados: [
        {
          titulo: 'Análisis de datos con Excel y Power BI',
          duracion: '34 horas',
          fecha: 'Mayo 2024',
          enlace: 'https://www.udemy.com/certificate/UC-9a061819-7dd5-4f00-92c9-e45e1be32558/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Excel: básico, intermedio y avanzado',
          duracion: '13.5 horas',
          fecha: 'Mayo 2024',
          enlace: 'https://www.udemy.com/certificate/UC-ee0f1b1b-5603-4520-a53b-656d37ec6639/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Python 3 + Data Analysis y Matplot',
          duracion: '14.5 horas',
          fecha: 'Mayo 2024',
          enlace: 'https://www.udemy.com/certificate/UC-84ecbb78-95e6-42a9-90c5-b305504348d4/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Business Analytics en Big Data',
          duracion: '02 horas',
          fecha: 'Octubre 2023',
          enlace: 'https://drive.google.com/file/d/10AYzNkwBNuMQPDdoRlzdMCksVJ72ULj5/view?usp=sharing',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'SQL: Principio a avanzado',
          duracion: '02 horas',
          fecha: 'Mayo 2021',
          enlace: 'https://www.udemy.com/certificate/UC-716ee953-40e0-4ad0-bd8a-bde4d96becce/?utm_campaign=email&utm_source=sendgrid.com&utm_medium=email',
          visible: false,
          textoAnimado: ''
        }
      ]
    },
    {
      nombre: 'Redes / Sistemas Operativos / Ciberseguridad',
      certificados: [
        {
          titulo: 'Cyber Threat Management Course',
          duracion: '16 horas',
          fecha: 'Marzo 2025',
          enlace: 'https://www.credly.com/badges/2b3a2766-9785-40d5-9510-950dcb95c283',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Linux: Debian y CentOS',
          duracion: '35.5 horas',
          fecha: 'Mayo 2024',
          enlace: 'https://www.udemy.com/certificate/UC-1a36b4d5-e858-4bd3-aa49-86d091179dc6/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Hacking ético a redes wifi',
          duracion: '3.5 horas',
          fecha: 'Mayo 2024',
          enlace: 'https://www.udemy.com/certificate/UC-a8e84e04-f4b5-410c-b8b2-91105531b509/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'CCNA Operaciones  de seguridad Cibernética',
          duracion: '150 horas',
          fecha: 'Junio 2023',
          enlace: 'https://ceti.org.pe/web/binary/verify?token=wrKT2PZ6982DCSWSGPERitvnvH6ZAe7TDI0pta1STVE',
          visible: false,
          textoAnimado: ''
        }
      ]
    },
    {
      nombre: 'Gestión de Proyectos / Gestión Pública',
      certificados: [
        {
          titulo: 'Gestión ágil de Proyectos - SCRUM',
          duracion: '01 horas',
          fecha: 'Marzo 2025',
          enlace: 'https://lms.becasgruporomero.pe/mod/customcert/verify_certificate.php?code=aoOasabEb1&qrcode=1',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Design Thinking',
          duracion: '02 horas',
          fecha: 'Marzo 2025',
          enlace: 'https://lms.becasgruporomero.pe/mod/customcert/verify_certificate.php?code=FImcFBs2FJ&qrcode=1',
          visible: false,
          textoAnimado: ''
        }
      ]
    },
    {
      nombre: 'Desarrollo/Programación',
      certificados: [
        {
          titulo: 'GIT+GITHUB Sistema de Control de Versión',
          duracion: '12 horas',
          fecha: 'Enero 2025',
          enlace: 'https://www.udemy.com/certificate/UC-ceeb8743-d3fa-4113-a942-8ad4a042654c/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'React Native CLI',
          duracion: '33 horas',
          fecha: 'Enero 2025',
          enlace: 'https://www.udemy.com/certificate/UC-d6ad32c0-c1ff-4a53-ab29-e8dafd949b26/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'DBA Oracle OCA OCP+ Linux Ubuntu, Debian, CentOS+ SQL',
          duracion: '37.5 horas',
          fecha: 'Diciembre 2024',
          enlace: 'https://www.udemy.com/certificate/UC-7209f00e-4d69-43a8-af20-418193494454/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Angular Edición 2023',
          duracion: '42.5 horas',
          fecha: 'Octubre 2023',
          enlace: 'https://www.udemy.com/certificate/UC-73523b14-0093-4f96-9ebb-0f47b7dca9a0/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Javascript whith HTml5, CSS3 2023',
          duracion: '17 horas',
          fecha: 'Septiembre 2023',
          enlace: 'https://www.udemy.com/certificate/UC-8b0855cd-bf1b-4538-8088-7307563968db/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'OWASP, Seguridad web',
          duracion: '06 horas',
          fecha: 'Septiembre 2023',
          enlace: 'https://www.udemy.com/certificate/UC-e583c866-8d6f-4e56-95a5-afc10d61587a/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Desarrollo de bases de datos con SQL Server',
          duracion: '19 horas',
          fecha: 'Septiembre 2023',
          enlace: 'https://www.udemy.com/certificate/UC-6e783c77-3028-4797-b645-47aacc03a99a/',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'PHP 7.0, LARAVEL Y PostgreSQL',
          duracion: '100 horas',
          fecha: 'Mayo 2022',
          enlace: 'https://ceti.org.pe/web/binary/verify?token=dGR0UcswaysfxZskMOkNl8VGZ7zbDA7_QqCBtTKAJLg',
          visible: false,
          textoAnimado: ''
        },
        {
          titulo: 'Videojuego con Unity 2018 y C#',
          duracion: '110 horas',
          fecha: 'Mayo 2020',
          enlace: 'https://www.udemy.com/certificate/UC-1e0ffd97-9ab2-4631-aba5-5657d2d13d62/',
          visible: false,
          textoAnimado: ''
        }
      ]
    },
  ];

  
  mostrarDetalles(categoriaIndex: number, certIndex: number) {
    this.categorias.forEach((categoria, catIdx) => {
      categoria.certificados.forEach((cert, certIdx) => {
        if (catIdx === categoriaIndex && certIdx === certIndex) {
          if (!cert.visible) {
            cert.textoAnimado = ''; // Reiniciar animación
            this.simularEscritura(cert);
          }
          cert.visible = !cert.visible;
        } else {
          cert.visible = false;
        }
      });
    });
    this.cdRef.detectChanges(); // 🔥 Forzar actualización en Angular
  }
  

  simularEscritura(cert: any) {
    let texto = `⏳ Duración: ${cert.duracion}\n📆 Fecha: ${cert.fecha}\n📜 Ver certificado aquí ➝ `;
    let i = 0;
    cert.textoAnimado = ''; // Reiniciar animación

    const escribirTexto = () => {
      if (i < texto.length) {
        cert.textoAnimado += texto[i];
        i++;
        this.cdRef.detectChanges(); // 🔥 Forzar la actualización de la vista
        setTimeout(escribirTexto, 50); // Llamamos a la función recursivamente
      }
    };
    escribirTexto();
    
  }

  
}
