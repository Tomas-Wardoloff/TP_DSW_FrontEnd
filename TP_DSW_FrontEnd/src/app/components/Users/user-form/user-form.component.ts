import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AthleteService } from '../../../services/athlete.service.ts';
import { ClubService } from '../../../services/club.service';
import { AgentService } from '../../../services/agent.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserType } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;
  id: number | null = null;
  error: string = '';
  
  // Enumeración de los tipos de usuarios
  userTypes = Object.values(UserType);
  clubs: any[] = [];  // Define la propiedad clubs


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private athleteService: AthleteService, // Servicio para Athlete
    private clubService: ClubService,       // Servicio para Club
    private agentService: AgentService,     // Servicio para Agent
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Formulario base
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      userType: [ Validators.required], // Campo para seleccionar el tipo de usuario
      // Atributos dinámicos de subclases
      athleteDetails: this.fb.group({
        firstname: ['', Validators.required, ],
        lastname: ['', Validators.required, ],
        nationality: ['', Validators.required, ],
        sport: ['', Validators.required, ],
        position: ['', Validators.required, ],
        isSigned: [false, Validators.required, ],//Bool
        birthDate: ['', Validators.required, ],//Date
        //userId: ['', Validators.required, ],

      }),
      /* clubDetails: this.fb.group({
        name: ['', Validators.required, ],
        address: ['', Validators.required, ],
        openingDate: ['', Validators.required, ],//Date,
        //userId: ['', Validators.required, ]
      }),
      agentDetails: this.fb.group({
        firstName: ['', Validators.required, ],
        lastName: ['', Validators.required, ],
        //userId: ['', Validators.required, ],
        clubId: ['', Validators.required, ],
      }) */
    });

  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  

  // Monitorear los cambios de valor en todo el formulario
    this.userForm.valueChanges.subscribe(value => {
    console.log('Estado del formulario:', this.userForm.status);  // INVALID o VALID
    console.log('Valores actuales del formulario:', value);})  // Valore
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        this.isEditMode = true;
        this.id = +idParam;
        this.loadUser(this.id);
        this.loadAthleteForm(this.id);
        this.loadClubs();


      }
    });
  }
  checkFormValidity(): void {
    // Iterar sobre cada control en el formulario
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      if (control && control.invalid) {
        console.log(`Campo inválido: ${field}`, control.errors);
      }
    });
  }


  loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  }
  loadAthleteForm(id: number): void {
    this.athleteService.getAthlete(id).subscribe({
      next: (athlete) => {
        this.userForm.patchValue(athlete);
      },
      error: (err) => {
        this.error = 'Error al cargar el athlete';
        console.error(err);
      }
    });
  }
  /* loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  }
  loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  } */
  loadClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs; // Asignar clubes al array
      },
      error: (err) => {
        console.error('Error al cargar los clubes', err);
      }
    });
  }
  // Mostrar campos dinámicos según el tipo de usuario seleccionado
  isAthlete(): boolean {
    return this.userForm.get('userType')?.value === UserType.ATHLETE;
  }

  isClub(): boolean {
    return this.userForm.get('userType')?.value === UserType.CLUB;
  }

  isAgent(): boolean {
    return this.userForm.get('userType')?.value === UserType.AGENT;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }


    const baseUserData: User = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      userType: this.userForm.get('userType')?.value,
      isActive: true,
      lastLogin: this.formatDateForMySQL(new Date()),
    };
    //ESTA PARTE HAY QUE VER SI ES NECESARIA O NO
    // Guardar los datos básicos de User
    if (this.isEditMode && this.id !== null) {
      this.userService.updateUser(this.id, baseUserData).subscribe({
        next: () => {
          this.saveSubClassData();
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.error = 'Error al actualizar el usuario';
          console.error(err);
        }
      });
    } else {
      this.userService.createUser(baseUserData).subscribe({
        next: () => {
          this.saveSubClassData();
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.error = 'Error al crear el usuario';
          console.error(err);
        }
      });
    }
  }
  formatDateForMySQL = (date: Date) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  };

  // Guardar los datos específicos de la subclase según el tipo de usuario
  saveSubClassData(): void {
    if (this.isAthlete() ){
      const athleteDetails = this.userForm.get('athleteDetails')?.value;
      this.athleteService.createAthlete(athleteDetails).subscribe({
        next: () => console.log('Datos de Athlete guardados'),
        error: (err) => console.error('Error al guardar Athlete', err)
      });
    } else if (this.isClub()) {
      const clubDetails = this.userForm.get('clubDetails')?.value;
      this.clubService.createClub(clubDetails).subscribe({
        next: () => console.log('Datos de Club guardados'),
        error: (err) => console.error('Error al guardar Club', err)
      });
    } else if (this.isAgent()) {
      const agentDetails = this.userForm.get('agentDetails')?.value;
      this.agentService.createAgent(agentDetails).subscribe({
        next: () => console.log('Datos de Agent guardados'),
        error: (err) => console.error('Error al guardar Agent', err)
      });
    }
  }
}
