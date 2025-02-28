import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth/login';
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('🔵 Tentative de connexion avec:', username, password);
    
    this.http.post<{ token: string }>(this.apiUrl, { username, password }).subscribe({
      next: (response) => {
        console.log(' Réponse reçue:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.token.set(response.token);
        } else {
          console.error(' Aucun token reçu');
        }
      },
      error: (err) => console.error(' Erreur de connexion:', err),
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}