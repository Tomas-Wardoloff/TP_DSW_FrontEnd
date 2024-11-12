// src/app/components/agents/agent-list/agent-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { switchMap } from 'rxjs';

import { AgentService } from '../../../services/agent.service';
import { UserService} from '../../../services/user.service';
import { Agent } from '../../../models/agent.model';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
  standalone: true,
  imports: [RouterModule,CommonModule]
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];
  isLoading: boolean = true;
  error: string = '';
  message: string = '';

  constructor(
    private agentService: AgentService,
    private userService: UserService, 
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAgents().subscribe({
      next: (response) => {
        this.agents = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los Atletas';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteAgentAndUser(id: number, userId: number): void{
    if (confirm('Al elimiar el Agente tambien eliminara al usuario\n¿Estás seguro de eliminar este usuario?')){
      this.isLoading = true;
      this.agentService.deleteAgent(id).pipe(
        switchMap(() => this.userService.deleteUser(userId)) // encadeno las solicitudes, solo si la primera es exitosa se ejecuta la segunda
      ).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'Agente eliminado correctamente'; // muestro confirmacion
          this.fetchAgents();
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Error al eliminar el Agente';
          console.error(err);
        }
      })   
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]); // redirige a la ruta para editar usuarios
  }  

  navigateToNewUser(): void {
    this.router.navigate(['/users/new']); // // redirige a la ruta para crear usuarios
  }
}

