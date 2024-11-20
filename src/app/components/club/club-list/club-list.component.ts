// src/app/components/clubs/club-list/club-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { switchMap } from 'rxjs';

import { ClubService } from '../../../services/club.service';
import { UserService} from '../../../services/user.service';
import { Club } from '../../../models/club.model';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
  imports: [RouterModule,CommonModule],
  standalone: true
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  isLoading: boolean = true;
  error: string = '';
  message: string = '';

  constructor(
    private clubService: ClubService,
    private userService: UserService, 
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.isLoading = true;
    this.clubService.getClubs().subscribe({
      next: (response) => {
        this.clubs = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los Clubes';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteClubAndUser(id: number, userId: number): void{
    if (confirm('Al elimiar el Club tambien eliminara al usuario\n¿Estás seguro de eliminar este usuario?')){
      this.isLoading = true;
      this.clubService.deleteClub(id).pipe(
        switchMap(() => this.userService.deleteUser(userId)) // encadeno las solicitudes, solo si la primera es exitosa se ejecuta la segunda
      ).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'Club eliminado correctamente'; // muestro confirmacion
          this.fetchClubs();
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Error al eliminar el Club';
          console.error(err);
        }
      })   
    }
  }

  editClub(id: number): void {
    this.router.navigate(['clubs/edit/', id]); // redirige a la ruta para editar clubes
  }  

  navigateToNewClub(): void {
    this.router.navigate(['clubs/new']); // redirige a la ruta para crear clubes
  }
}
