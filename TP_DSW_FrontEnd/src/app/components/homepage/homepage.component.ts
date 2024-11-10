import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,  
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',  
  styleUrls: ['./homepage.component.css'],    
  imports: [CommonModule,RouterModule], 
})
export class HomepageComponent {
  title: string = 'Bienvenido a la Página de Inicio';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  onButtonClick() {
  }
}

