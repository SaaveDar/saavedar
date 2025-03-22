import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements AfterViewInit, OnDestroy {

  private animationFrameId: any;
  private spaceship: HTMLElement | null = null;
  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;
  private speed = 2; // Velocidad del cohete

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.spaceship = document.getElementById("spaceship");

      if (!this.spaceship) {
        console.error("No se encontró el elemento spaceship en el DOM.");
        return;
      }

      this.x = Math.random() * (window.innerWidth - 50);
      this.y = Math.random() * (window.innerHeight - 50);
      this.spaceship.style.left = `${this.x}px`;
      this.spaceship.style.top = `${this.y}px`;

      this.setNewTarget();
      this.animate();
    }
  }

  setNewTarget() {
    this.targetX = Math.random() * (window.innerWidth - 50);
    this.targetY = Math.random() * (window.innerHeight - 50);
  }

  animate = () => {
    if (!this.spaceship) return;

    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.speed) {
      this.setNewTarget();
    } else {
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;

      this.spaceship.style.left = `${this.x}px`;
      this.spaceship.style.top = `${this.y}px`;
      this.spaceship.style.transform = `rotate(${angle}deg)`;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
