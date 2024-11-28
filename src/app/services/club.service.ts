import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Club } from '../models/club.model'; 

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/api/clubs';

  constructor(private http: HttpClient) {}

  getClub(id: number): Observable<{message: string, data: Club}> {
    return this.http.get<{message: string, data: Club}>(`${this.apiUrl}/${id}`);
  }

  getClubs(name?: string): Observable<{message: string, data: Club[]}> {
    let params = new HttpParams(); 
    if (name) {
      params = params.append('name', name);
    }
    return this.http.get<{message: string, data: Club[]}>(this.apiUrl, {params});
  }

  createClub(Club: Club): Observable<{message: string, data: Club}> {
    return this.http.post<{message: string, data: Club}>(this.apiUrl, Club);
  }

  updateClub(id: number, Club: Club): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.apiUrl}/${id}`, Club);
  }

  deleteClub(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}