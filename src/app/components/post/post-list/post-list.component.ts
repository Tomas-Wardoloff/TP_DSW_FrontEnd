import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from 'app/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  @Input() post!: Post;
}
