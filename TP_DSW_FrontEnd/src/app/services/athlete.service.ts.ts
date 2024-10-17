import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athelete.model'; // Importa tu modelo

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:3000/api/athletes'; // Cambia esto a tu endpoint

  constructor(private http: HttpClient) {}
  
  getAthlete(id: number): Observable<Athlete> {
    return this.http.get<Athlete>(`${this.apiUrl}/${id}`);
  }
  getAthletes(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(this.apiUrl);
  }

  createAthlete(Athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(this.apiUrl, Athlete);
  }

  updateAthlete(id: number, Athlete: Athlete): Observable<Athlete> {
    return this.http.put<Athlete>(`${this.apiUrl}/${id}`, Athlete);
  }

  deleteAthlete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

