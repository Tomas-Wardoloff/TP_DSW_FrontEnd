import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [CommonModule],
})
export class PostsComponent {
  posts: string[] = ['Post 1', 'Post 2', 'Post 3'];  // Ejemplo de posts

  constructor() {
    // Aquí puedes cargar los posts desde tu backend
  }

  // Método para agregar un nuevo post
  addPost(newPost: string) {
    this.posts.push(newPost);
    console.log('Nuevo post agregado:', newPost);
  }
}
