// src/app/components/agents/agent-form/agent-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../../services/agent.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from '../../../models/agent.model';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  isEditMode: boolean = false;
  agentId: number | null = null;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.agentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,Validators.minLength(8)],
      phoneNumber: ['', Validators.required,Validators.minLength(9)],
      agentType: ['', Validators.required, ],
      //isActive: Boolean;
      //lastLogin: Date;
      firstName: ['', Validators.required, ],
      lastName: ['', Validators.required, ],
      user: ['', Validators.required, ],
      club: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.agentId = +idParam;
        this.loadAgent(this.agentId);
      }
    });
  }

  loadAgent(id: number): void {
    this.agentService.getAgent(id).subscribe({
      next: (agent) => this.agentForm.patchValue(agent),
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.agentForm.invalid) {
      return;
    }

    const agent: Agent = this.agentForm.value;

    if (this.isEditMode && this.agentId !== null) {
      this.agentService.updateAgent(this.agentId, agent).subscribe({
        next: () => this.router.navigate(['/agents']),
        error: (err) => {
          this.error = 'Error al actualizar el usuario';
          console.error(err);
        }
      });
    } else {
      this.agentService.createAgent(agent).subscribe({
        next: () => this.router.navigate(['/agents']),
        error: (err) => {
          this.error = 'Error al crear el usuario';
          console.error(err);
        }
      });
    }
  }
}