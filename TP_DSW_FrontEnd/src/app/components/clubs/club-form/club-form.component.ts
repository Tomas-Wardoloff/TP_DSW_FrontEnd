// src/app/components/clubs/club-form/club-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubService } from '../../../services/club.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Club } from '../../../models/club.model';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {
  clubForm: FormGroup;
  isEditMode: boolean = false;
  clubId: number | null = null;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clubForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,Validators.minLength(8)],
      phoneNumber: ['', Validators.required,Validators.minLength(9)],
      clubType: ['', Validators.required, ],
      //isActive: Boolean;
      //lastLogin: Date;
      name: ['', Validators.required, ],
      adress: ['', Validators.required, ],
      openingDate: ['', Validators.required, ],
      user: ['', Validators.required, ]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.clubId = +idParam;
        this.loadClub(this.clubId);
      }
    });
  }

  loadClub(id: number): void {
    this.clubService.getClub(id).subscribe({
      next: (club) => this.clubForm.patchValue(club),
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.clubForm.invalid) {
      return;
    }

    const club: Club = this.clubForm.value;

    if (this.isEditMode && this.clubId !== null) {
      this.clubService.updateClub(this.clubId, club).subscribe({
        next: () => this.router.navigate(['/clubs']),
        error: (err) => {
          this.error = 'Error al actualizar el usuario';
          console.error(err);
        }
      });
    } else {
      this.clubService.createClub(club).subscribe({
        next: () => this.router.navigate(['/clubs']),
        error: (err) => {
          this.error = 'Error al crear el usuario';
          console.error(err);
        }
      });
    }
  }
}