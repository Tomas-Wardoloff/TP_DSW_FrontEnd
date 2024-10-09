import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.model'; // Importa tu modelo

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:3000/api/agent'; // Cambia esto a tu endpoint

  constructor(private http: HttpClient) {}
  getAgent(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }
  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  createAgent(Agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, Agent);
  }

  updateAgent(id: number, Agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/${id}`, Agent);
  }

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

