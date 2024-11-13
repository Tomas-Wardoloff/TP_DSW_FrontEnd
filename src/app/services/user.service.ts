import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserType } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<{message: string, data: User}> {
    return this.http.get<{message: string, data: User}>(`${this.apiUrl}/${id}`);
  }

  getUsers(userType?: UserType): Observable<{message: string, data: User[]}> {
    let params = new HttpParams();
    if (userType) {
      params = params.append('userType', userType);
    }
    return this.http.get<{message: string, data: User[]}>(this.apiUrl, {params});
  }

  createUser(User: User): Observable<{message: string, data: User}> {
    return this.http.post<{message: string, data: User}>(this.apiUrl, User);
  }

  updateUser(id: number, User: User): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.apiUrl}/${id}`, User);
  }

  deleteUser(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}
