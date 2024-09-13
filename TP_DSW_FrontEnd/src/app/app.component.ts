import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Importar RouterOutlet para el enrutamiento

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',  // Asegúrate de tener este archivo
  styleUrls: ['./app.component.css'],    // Asegúrate de tener este archivo
  imports: [CommonModule, RouterOutlet],  // Importar CommonModule y RouterOutlet
})
export class AppComponent {
  title = 'Mi Aplicación Angular';  // Título de tu aplicación

  constructor() {
    // Aquí puedes inicializar cualquier dato necesario
  }
}

