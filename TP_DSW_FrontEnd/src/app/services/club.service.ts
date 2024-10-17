import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../models/club.model'; // Importa tu modelo

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/api/clubs'; // Cambia esto a tu endpoint

  constructor(private http: HttpClient) {}
  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }
  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.apiUrl);
  }

  createClub(Club: Club): Observable<Club> {
    return this.http.post<Club>(this.apiUrl, Club);
  }

  updateClub(id: number, Club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/${id}`, Club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

