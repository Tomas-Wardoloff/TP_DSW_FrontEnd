// src/app/components/athletes/athlete-list/athlete-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../../../services/athlete.service.ts';
import { Athlete } from '../../../models/athelete.model.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private athleteService: AthleteService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAthletes();
  }

  fetchAthletes(): void {
    this.athleteService.getAthletes().subscribe({
      next: (data) => {
        this.athletes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los Atletas';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteAthlete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este atleta?')) {
      this.athleteService.deleteAthlete(id).subscribe({
        next: () => this.fetchAthletes(),
        error: (err) => {
          this.error = 'Error al eliminar el atleta';
          console.error(err);
        }
      });
    }
  }

  editAthlete(id: number): void {
    this.router.navigate(['/athletes/edit', id]);
  }
}
