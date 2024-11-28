import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Post } from 'app/models/post.model';
import { PostService } from 'app/services/post.service';
import { PostListComponent } from '../post/post-list/post-list.component';
import { PostFormComponent } from '../post/post-form/post-form.component';

@Component({
  standalone: true,  
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',  
  styleUrls: ['./homepage.component.css'],    
  imports: [CommonModule, PostListComponent, PostFormComponent], 
})
export class HomepageComponent implements OnInit{
  posts: Post[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (response) => {
        this.posts = response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'No tienes permisos para ver los posts';
        } else {
          this.error = 'Error al cargar los posts';
        }
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  onPostCreated(): void {
    this.loadPosts();
  }
}
