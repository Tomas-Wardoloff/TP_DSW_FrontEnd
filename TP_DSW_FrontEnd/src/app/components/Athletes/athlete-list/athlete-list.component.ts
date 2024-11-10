// src/app/components/athletes/athlete-list/athlete-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../../../services/athlete.service';
import { UserService} from '../../../services/user.service';
import { Athlete } from '../../../models/athelete.model';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css'],
  standalone: true,
  imports: [RouterModule,CommonModule]
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[] = [];
  isLoading: boolean = true;
  error: string = '';

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
    this.athleteService.getAthletes().subscribe({
      next: (data) => {
        this.athletes = data;
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
      this.athleteService.deleteAthlete(id).subscribe({
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
