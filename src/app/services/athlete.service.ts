import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Athlete } from '../models/athlete.model';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:3000/api/athletes';

  constructor(private http: HttpClient) {}
  
  getAthlete(id: number): Observable<{message: string, data: Athlete}> {
    return this.http.get<{message: string, data: Athlete}>(`${this.apiUrl}/${id}`);
  }

  getAthletes(): Observable<{message: string, data: Athlete[]}> {
    return this.http.get<{message: string, data: Athlete[]}>(this.apiUrl);
  }

  createAthlete(Athlete: Athlete): Observable<{message: string, data: Athlete}> {
    return this.http.post<{message: string, data: Athlete}>(this.apiUrl, Athlete);
  }

  updateAthlete(id: number, Athlete: Athlete): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.apiUrl}/${id}`, Athlete);
  }

  deleteAthlete(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}

