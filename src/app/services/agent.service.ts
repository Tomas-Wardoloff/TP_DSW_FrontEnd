import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Agent } from '../models/agent.model'; 


@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:3000/api/agents';

  constructor(private http: HttpClient) {}

  getAgent(id: number): Observable<{message: string, data: Agent}> {
    return this.http.get<{message: string, data: Agent}>(`${this.apiUrl}/${id}`);
  }

  getAgents(): Observable<{message: string, data: Agent[]}> {
    return this.http.get<{message: string, data: Agent[]}>(this.apiUrl);
  }

  createAgent(Agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, Agent);
  }

  updateAgent(id: number, Agent: Agent): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.apiUrl}/${id}`, Agent);
  }

  deleteAgent(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}

