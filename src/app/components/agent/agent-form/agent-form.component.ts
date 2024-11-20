import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Club } from 'app/models/club.model';
import { User, UserType } from 'app/models/user.model';
import { AgentService } from 'app/services/agent.service';
import { ClubService } from 'app/services/club.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  isEditMode: boolean = false;
  users: User[] = [];
  clubs: Club[] = [];
  error: string = '';

  // Filtros
  userTypeFilter: UserType = UserType.AGENT;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private userService: UserService,
    private clubService: ClubService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userId: [''],
      clubId: ['']
    });
  }
  
  ngOnInit(): void {
    // cargo los usuarios para ser mostrados en el select
    this.userService.getUsers(this.userTypeFilter).subscribe({
      next:(response) => {
        this.users = response.data;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        console.error(err);
      }
    }); 

    // cargo los clubes para ser mostrados en el select
    this.clubService.getClubs().subscribe({
      next:(response) => {
        this.clubs = response.data;
      },
      error: (err) => {
        this.error = 'Error al cargar los clubes';
        console.error(err);
      }
    });

    // verifico los parametros de la ruta para saber si estoy en modo edicion
    this.route.params.subscribe(params => {
      const agentId = params['id'];
      if (agentId){
        this.isEditMode = true;
        this.agentService.getAgent(agentId).subscribe({
          next: (response) => {
            const agentData = response.data;
            this.agentForm.patchValue({
              firstName: agentData.firstName,
              lastName: agentData.lastName,
              userId: agentData.user.id,
              clubId: agentData.club.id
            });
          },
          error: (err) => {
            this.error = 'Error al cargar el agente';
            console.error(err);
          }
        });
      }
    });
  }
  
  onSubmit(): void {
    if (this.agentForm.valid){
      if (this.isEditMode){
        const agentId = this.route.snapshot.params['id'];
        this.agentService.updateAgent(agentId, this.agentForm.value).subscribe({
          next: () => {
            this.router.navigate(['/agents']);
          },
          error: (err) => {
            this.error = 'Error al actualizar el agente';
            console.error(err);
          }
        });
      } else {
        this.agentService.createAgent(this.agentForm.value).subscribe({
          next: () => {
            this.router.navigate(['/agents']);
          },
          error: (err) => {
            if (err.status == 409) {
              this.error = 'El agente ya existe para ese usuario';
            } else {
              this.error = 'Error al crear el agente';
            }
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
