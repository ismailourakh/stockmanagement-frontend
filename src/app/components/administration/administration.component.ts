import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  users: User[] = [];
  newUser: Partial<User> = {};
  confirmPassword: string = '';
  selectedUser: User = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    email: '',
    laboratory: '',
    sector: '',
    role: ''
  };
  userToDelete: User | null = null;
  searchKeyword: string = '';
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.map(user => ({
          ...user,
          role: user.role || ''  // Ensuring role is a string
        }));
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    });
  }

  // Search users based on keyword
  searchUsers(): void {
    if (this.searchKeyword.trim() === '') {
      this.loadUsers();
      return;
    }
    this.userService.search(this.searchKeyword).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche', error);
      }
    });
  }

  // Open modal to create user
  openCreateUserModal(): void {
    this.newUser = {};  // Reset newUser form
    this.confirmPassword = '';
    this.showCreateModal = true;
  }

  // Create a new user
  createUser(): void {
    if (!this.newUser.password || this.newUser.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = {};
        this.confirmPassword = '';
        this.showCreateModal = false;
        // Close the modal programmatically using Bootstrap
        const modal = document.getElementById('createUserModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      },
      error: (error) => {
        console.error('Erreur lors de la création de l’utilisateur', error);
      }
    });
  }

  // Open modal to edit user
  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.showEditModal = true;
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
  }

  // Update user
  updateUser(): void {
    if (this.selectedUser && this.selectedUser.id) {
      this.userService.update(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.selectedUser = {
            id: 0,
            username: '',
            password: '',
            fullName: '',
            email: '',
            laboratory: '',
            sector: '',
            role: ''
          };
          this.showEditModal = false;
          // Close the modal programmatically using Bootstrap
          const modal = document.getElementById('editUserModal');
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l’utilisateur', error);
        }
      });
    }
  }

  // Close delete modal programmatically
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    const modal = document.getElementById('deleteUserModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  // Confirm deletion of user
  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
    const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    modal.show();
  }

  // Delete the user
  deleteUser(): void {
  if (this.userToDelete && this.userToDelete.id) {
    this.userService.delete(this.userToDelete.id).subscribe({
      next: () => {
        // Reload the users after deletion
        this.loadUsers();
        
        // Reset the state for deleted user and close modal
        this.userToDelete = null;
        this.showDeleteModal = false;
        
        // Close the modal programmatically using Bootstrap
        const modal = document.getElementById('deleteUserModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l’utilisateur', error);
      }
    });
  }
}

}
