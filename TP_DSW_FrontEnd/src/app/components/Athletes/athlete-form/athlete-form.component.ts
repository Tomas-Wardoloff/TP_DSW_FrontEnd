// src/app/components/athletes/athlete-form/athlete-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AthleteService } from '../../../services/athlete.service.ts';
import { Router, ActivatedRoute } from '@angular/router';
import { Athlete } from '../../../models/athelete.model.js';

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css']
})
export class AthleteFormComponent implements OnInit {
  athleteForm: FormGroup;
  isEditMode: boolean = false;
  athleteId: number | null = null;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private athleteService: AthleteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.athleteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,Validators.minLength(8)],
      phoneNumber: ['', Validators.required,Validators.minLength(9)],
      athleteType: ['', Validators.required, ],
      //isActive: Boolean;
      //lastLogin: Date;
      firstname: ['', Validators.required, ],
      lastname: ['', Validators.required, ],
      sport: ['', Validators.required, ],
      position: ['', Validators.required, ],
      isSigned: ['', Validators.required, ],//Bool
      birthDate: ['', Validators.required, ],//Date
      user: ['', Validators.required, ]//User
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.athleteId = +idParam;
        this.loadAthlete(this.athleteId);
      }
    });
  }

  loadAthlete(id: number): void {
    this.athleteService.getAthlete(id).subscribe({
      next: (athlete) => this.athleteForm.patchValue(athlete),
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.athleteForm.invalid) {
      return;
    }

    const athlete: Athlete = this.athleteForm.value;

    if (this.isEditMode && this.athleteId !== null) {
      this.athleteService.updateAthlete(this.athleteId, athlete).subscribe({
        next: () => this.router.navigate(['/athletes']),
        error: (err) => {
          this.error = 'Error al actualizar el usuario';
          console.error(err);
        }
      });
    } else {
      this.athleteService.createAthlete(athlete).subscribe({
        next: () => this.router.navigate(['/athletes']),
        error: (err) => {
          this.error = 'Error al crear el usuario';
          console.error(err);
        }
      });
    }
  }
}
