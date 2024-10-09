import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,  // Este componente es standalone
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',  // Asegúrate de tener este archivo
  styleUrls: ['./homepage.component.css'],    // Asegúrate de tener este archivo
  imports: [CommonModule],  // Solo se importa CommonModule para directivas comunes
})
export class HomepageComponent {
  // Aquí puedes definir propiedades y métodos específicos de tu componente
  title: string = 'Bienvenido a la Página de Inicio';

  constructor() {
    // Puedes inicializar cualquier dato aquí
  }

  // Ejemplo de un método
  onButtonClick() {
    console.log('Botón de la página de inicio clickeado!');
  }
}

