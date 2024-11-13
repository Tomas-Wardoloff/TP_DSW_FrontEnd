import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<{message: string, data: User}> {
    return this.http.get<{message: string, data: User}>(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<{message: string, data: User[]}> {
    return this.http.get<{message: string, data: User[]}>(this.apiUrl);
  }

  createUser(User: User): Observable<{message: string, data: User}> {
    return this.http.post<{message: string, data: User}>(this.apiUrl, User);
  }

  updateUser(id: number, User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, User);
  }

  deleteUser(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}
