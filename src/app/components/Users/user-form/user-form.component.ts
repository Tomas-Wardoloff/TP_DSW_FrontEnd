import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserFormComponent implements OnInit{
  userForm: FormGroup;
  isEditMode: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
      userType: ['', [Validators.required]],
      lastLogin: ['']
    });
  }

  ngOnInit(): void {
    // verifico los parametros de la ruta para saber si estoy en modo edicion
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId){
        this.isEditMode = true;
        this.userService.getUser(userId).subscribe({
          next: (response) => {
            this.userForm.patchValue(response.data);
          },
          error: (err) => {
            this.error = 'Error al cargar los datos del ususario';
            console.error(err); 
          }
        });
      }
    });
  }

  onSubmit(): void {
    console.log(this.isEditMode);
    if (this.userForm.valid) {
      this.userForm.patchValue({ lastLogin: new Date().toISOString() }); // seteo la fecha y hora actual como lastLogin
      
      if (this.isEditMode){
        const userId = this.route.snapshot.params['id'];
        this.userService.updateUser(userId, this.userForm.value).subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.error = 'Ocurrio un error al actualizar el usuario';
            console.error(err);
          }
        });
      } else {
        this.userService.createUser(this.userForm.value).subscribe({
          next: () => { this.router.navigate(['/users']); },
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
