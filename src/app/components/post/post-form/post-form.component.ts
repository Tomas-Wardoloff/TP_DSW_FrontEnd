import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { PostService } from 'app/services/post.service';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-post-form',
  standalone: true,
  styleUrl: './post-form.component.css',
  templateUrl: './post-form.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class PostFormComponent implements OnInit{
  @Output() postCreated = new EventEmitter<void>();
  postForm: FormGroup;
  users: User[] = [];
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ){
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      author: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.valid){
      this.postService.createPost(this.postForm.value).subscribe({
        next: (response) => {
          this.postCreated.emit();
        },
        error: (err) => {
          this.error = 'Error al crear el post';
          console.error(err);
        }
      });
    }
    this.postForm.reset();
  }
}
