import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],    
  imports: [CommonModule, RouterOutlet, NavbarComponent],
})
export class AppComponent {
  title = 'Mi Aplicación Angular';
  constructor() {}
}

