import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [CommonModule,RouterModule],
})
export class PostsComponent {
  posts: string[] = ['Post 1', 'Post 2', 'Post 3'];  // Ejemplo de posts

  constructor(
      private router: Router,
      private route: ActivatedRoute,    
  ) {
  }

  // Método para agregar un nuevo post
  addPost(newPost: string) {
    this.posts.push(newPost);
    console.log('Nuevo post agregado:', newPost);
  }
}
