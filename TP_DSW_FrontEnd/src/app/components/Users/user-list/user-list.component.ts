// src/app/components/users/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.fetchUsers(),
        error: (err) => {
          this.error = 'Error al eliminar el usuario';
          console.error(err);
        }
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }
  navigateToNewUser(): void {
    this.router.navigate(['/users/new']); // Navega al formulario para crear un nuevo usuario
  }
}

