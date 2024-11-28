import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPost(id: number): Observable<{message: string, data: Post}>{
    return this.http.get<{message: string, data: Post}>(`${this.apiUrl}/${id}`);
  }

  getPosts(): Observable<{message: string, data: Post[]}>{
    return this.http.get<{message: string, data: Post[]}>(this.apiUrl);
  }

  createPost(Post: Post): Observable<{message: string, data: Post}>{
    return this.http.post<{message: string, data: Post}>(this.apiUrl, Post);
  }
}
