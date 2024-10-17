// src/app/components/agents/agent-list/agent-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
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

  constructor(private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAgents().subscribe({
      next: (data) => {
        this.agents = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los agentes';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteAgent(id: number): void {
    if (confirm('¿Estás seguro de eliminar este agente?')) {
      this.agentService.deleteAgent(id).subscribe({
        next: () => this.fetchAgents(),
        error: (err) => {
          this.error = 'Error al eliminar el agente';
          console.error(err);
        }
      });
    }
  }

  editAgent(id: number): void {
    this.router.navigate(['/agents/edit', id]);
  }
  navigateToNewUser(): void {
    this.router.navigate(['/users/new']); // Navega al formulario para crear un nuevo usuario
  }
}

