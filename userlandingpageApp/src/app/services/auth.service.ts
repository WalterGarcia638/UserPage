import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {private apiUrl = 'https://reqres.in/api/login';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated = true;
        return true;
      }),
      catchError(() => {
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}