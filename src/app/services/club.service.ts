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

  getClub(id: number): Observable<{message: string, data: Club}> {
    return this.http.get<{message: string, data: Club}>(`${this.apiUrl}/${id}`);
  }

  getClubs(): Observable<{message: string, data: Club[]}> {
    return this.http.get<{message: string, data: Club[]}>(this.apiUrl);
  }

  createClub(Club: Club): Observable<Club> {
    return this.http.post<Club>(this.apiUrl, Club);
  }

  updateClub(id: number, Club: Club): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.apiUrl}/${id}`, Club);
  }

  deleteClub(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}

