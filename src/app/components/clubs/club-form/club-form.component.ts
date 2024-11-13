import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'app/models/user.model';
import { ClubService } from 'app/services/club.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-club-form',
  standalone: true,
  templateUrl: './club-form.component.html',
  styleUrl: './club-form.component.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class ClubFormComponent implements OnInit{
  clubForm: FormGroup;
  isEditMode: boolean = false;
  users: User[] = [];
  error: string = '';
  
  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clubForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      openingDate: ['', [Validators.required]],
      userId: ['']
    });
  }
  ngOnInit(): void {
    // cargo los usuarios para ser mostrados en el select
    this.userService.getUsers().subscribe({
      next:(response) => {
        this.users = response.data;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        console.error(err);
      }
    }); 

    // verifico los parametros de la ruta para saber si estoy en modo edicion
    this.route.params.subscribe(params => {
      const clubId = params['id'];
      if (clubId){
        this.isEditMode = true;
        this.clubService.getClub(clubId).subscribe({
          next: (response) => {
            const clubData = response.data;
            const openingDate = new Date(clubData.openingDate).toISOString().split('T')[0];
            this.clubForm.patchValue({
              name: clubData.name,
              address: clubData.address,
              openingDate: openingDate,
              userId: clubData.user.id
            });
          },
          error: (err) => {
            this.error = 'Error al cargar el club';
            console.error(err);
          }
        });
      }
    });
  }
  
  onSubmit() {
    if(this.clubForm.valid){
      this.clubService.createClub(this.clubForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          this.error = 'Error al crear el club';
          console.error(err);
        }
      })
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
