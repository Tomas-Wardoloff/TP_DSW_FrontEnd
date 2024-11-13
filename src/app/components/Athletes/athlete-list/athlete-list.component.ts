// src/app/components/athletes/athlete-list/athlete-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { switchMap } from 'rxjs';

import { UserService} from '../../../services/user.service';
import { AthleteService } from '../../../services/athlete.service';
import { Athlete } from '../../../models/athlete.model'; 


@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[] = [];
  isLoading: boolean = true;
  error: string = '';
  message: string = '';
  
  // Filtros
  sportFilter: string = '';

  constructor(
    private athleteService: AthleteService, 
    private router: Router, 
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchAthletes();
  }

  fetchAthletes(): void {
    this.isLoading = true;
    this.athleteService.getAthletes(this.sportFilter).subscribe({
      next: (response) => {
        this.athletes = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los Atletas';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteAthleteAndUser(id: number, userId: number): void{
    if (confirm('Al elimiar el Atleta tambien eliminara al usuario\n¿Estás seguro de eliminar este usuario?')){
      this.isLoading = true;
      this.athleteService.deleteAthlete(id).pipe(
        switchMap(() => this.userService.deleteUser(userId)) // encadeno las solicitudes, solo si la primera es exitosa se ejecuta la segunda
      ).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'Atleta eliminado correctamente'; // muestro confirmacion
          this.fetchAthletes();
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Error al eliminar el atleta';
          console.error(err);
        }
      })   
    }
  }

  editAthlete(id: number): void {
    this.router.navigate(['/athletes/edit', id]); // redirige a la ruta para editar atleta
  }

  navigateToNewAthlete(): void {
    this.router.navigate(['/athletes/new']); // redirige a la ruta para crear athleta
  }

  onFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.sportFilter = inputElement.value;
    this.fetchAthletes();
  }
}
