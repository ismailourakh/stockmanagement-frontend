import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private authService = inject(AuthService);
  isCollapsed = false;
  isLoggedIn = this.authService.isAuthenticated(); // Vérifie si l'utilisateur est connecté

  constructor() {
    // 🔥 Met à jour isLoggedIn automatiquement lorsque le token change
    effect(() => {
      this.isLoggedIn = this.authService.isAuthenticated();
    });
  }

  logout() {
    this.authService.logout();
  }
}
