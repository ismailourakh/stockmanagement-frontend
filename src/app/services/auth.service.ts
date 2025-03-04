import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth/login';
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    // Clear any existing token before logging in
    localStorage.removeItem('token');
  
    this.http.post<{ token: string }>(this.apiUrl, { username, password }).subscribe({
      next: (response) => {
        if (response.token) {
          console.log(' New Token Received:', response.token); // Debugging log
          localStorage.setItem('token', response.token);
          this.token.set(response.token); // Assuming this is a BehaviorSubject or similar
          this.router.navigate(['/accueil']);
        } else {
          console.warn(' No token received, login failed.');
        }
      },
      error: (err) => {
        console.error(' Erreur de connexion:', err);
      },
    });
  }
  

  getToken(): string | null {
    return this.token();
  }

  isAuthenticated(): boolean {
    return this.token() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['/login']);
  }
}
