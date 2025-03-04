import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  laboratory: string;
  sector: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/users';
  private authUrl = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    console.log("mytoken",token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(this.apiUrl, { headers });
  }
  

  search(keyword: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }
}
