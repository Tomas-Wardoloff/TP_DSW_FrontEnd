import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from 'app/models/post.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  @Input() post!: Post;
}
