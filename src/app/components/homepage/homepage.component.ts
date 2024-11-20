import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Post } from 'app/models/post.model';
import { PostService } from 'app/services/post.service';
import { PostsComponent } from "../posts/posts.component";

@Component({
  standalone: true,  
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',  
  styleUrls: ['./homepage.component.css'],    
  imports: [CommonModule, PostsComponent], 
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
        this.posts = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los posts';
        this.isLoading = false;
      }
    });
  }
}
