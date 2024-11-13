import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { AthleteService } from '../../../services/athlete.service';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  styleUrl: './athlete-form.component.css',
  templateUrl: './athlete-form.component.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class AthleteFormComponent implements OnInit{
  athleteForm: FormGroup;
  isEditMode: boolean = false;
  users: User[] = [];
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private athleteService: AthleteService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.athleteForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      sport: ['', [Validators.required]],
      position: ['', [Validators.required]],
      isSigned: [false, [Validators.required]],
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
      const athleteId = params['id'];
      if (athleteId){
        this.isEditMode = true;
        this.athleteService.getAthlete(athleteId).subscribe({
          next: (response) => {
            const athleteData = response.data;
            const birthDate = new Date(athleteData.birthDate).toISOString().split('T')[0]; // formateo la fecha para cargarla en el formulario
            this.athleteForm.patchValue({
              firstName: athleteData.firstName,
              lastName: athleteData.lastName,
              birthDate: birthDate,
              nationality: athleteData.nationality,
              sport: athleteData.sport,
              position: athleteData.position,
              isSigned: athleteData.isSigned,
              userId: athleteData.user.id
            });
          },
          error: (err) => {
            this.error = 'Error al cargar los datos del atleta';
            console.error(err); 
          }
        });
      }
    });
  }
  
  onSubmit(): void {
    if (this.athleteForm.valid){
      if (this.isEditMode){
        const athleteId = this.route.snapshot.params['id'];
        this.athleteService.updateAthlete(athleteId, this.athleteForm.value).subscribe({
          next: () => { 
            this.router.navigate(['/athletes']); 
          },
          error: (err) => { 
            this.error = 'Error al actualizar el atleta'; 
            console.log(err);
          }
        });
      } else {
        this.athleteService.createAthlete(this.athleteForm.value).subscribe({
          next: () => { 
            this.router.navigate(['/athletes']); 
          },
          error: (err) => { 
            this.error = err; 
            console.log(err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
