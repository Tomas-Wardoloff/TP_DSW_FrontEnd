// src/app/components/clubs/club-list/club-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../services/club.service';
import { Club } from '../../../models/club.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (data) => {
        this.clubs = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los clubes';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteClub(id: number): void {
    if (confirm('¿Estás seguro de eliminar este clube?')) {
      this.clubService.deleteClub(id).subscribe({
        next: () => this.fetchClubs(),
        error: (err) => {
          this.error = 'Error al eliminar el clube';
          console.error(err);
        }
      });
    }
  }

  editClub(id: number): void {
    this.router.navigate(['/clubs/edit', id]);
  }
}
