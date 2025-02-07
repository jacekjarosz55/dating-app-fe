import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private token$ = new BehaviorSubject<string | null>(null);

  login(username: string, password: string) {
    this.http.post<{token: string}>("http://localhost:8008/auth/login", {
      username: username,
      password: password
    }).subscribe(res => {
      this.token$.next(res.token);
    });
  }

  logout() {
    this.token$.next(null);
  }

  getToken(): Observable<string | null> {
    return this.token$.asObservable();
  }

  tokenValue(): string | null {
    return this.token$.getValue();
  }
}
