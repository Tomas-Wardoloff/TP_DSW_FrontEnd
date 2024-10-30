// src/app/components/clubs/club-list/club-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../services/club.service';
import { UserService} from '../../../services/user.service';

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

  constructor(private clubService: ClubService,private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (data) => {
        this.clubs = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los Atletas';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteUser(id: number,userId:number): void {
    if (confirm('Al elimiar el Atleta tambien eliminara al usuario\n¿Estás seguro de eliminar este usuario?')) {
      console.log(id)
      this.clubService.deleteClub(id).subscribe({
        next: () => {
          this.userService.deleteUser(userId).subscribe({
            next: () => {
            },
            error: (err) => {
              this.error = 'Error al eliminar el usuario';
              console.error(err);
            }
          });
        },
        error: (err) => {
          this.error = 'Error al eliminar el atleta';
          console.error(err);
        }
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }  
  navigateToNewUser(): void {
    this.router.navigate(['/users/new']); // Navega al formulario para crear un nuevo usuario
  }
}
