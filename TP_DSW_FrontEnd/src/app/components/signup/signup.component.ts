import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js'; // Importa el servicio que creaste
@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      /* nombre: ['',[Validators.required, Validators.maxLength(20)]],
      apellido: ['',[Validators.required, Validators.maxLength(30)]], */
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,}$/)]], // Mínimo una mayúscula, una minúscula, un número y un carácter especial]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userType: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.authService.register(this.signUpForm.value).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente', response);
          // Aquí puedes redirigir al usuario o mostrar un mensaje
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
          // Manejo de errores, como mostrar un mensaje al usuario
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }
}
