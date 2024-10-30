// src/app/components/agents/agent-list/agent-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { UserService} from '../../../services/user.service';

import { Agent } from '../../../models/agent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private agentService: AgentService,private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAgents().subscribe({
      next: (data) => {
        this.agents = data;
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
      this.agentService.deleteAgent(id).subscribe({
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

