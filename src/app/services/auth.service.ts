import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private token$ = new BehaviorSubject<string | null>(null);
  private userInfo$ = this.token$.pipe(switchMap(token => {
    if (token == null) return of(null);
    return this.http.get<User>("http://localhost:8008/auth/me");
  }));

  constructor() {
    const loadedToken = localStorage.getItem("token");
    if(loadedToken) {
      this.token$.next(loadedToken);
    }
    this.token$.pipe(takeUntilDestroyed()).subscribe(tok => {
      if(tok) {
        localStorage.setItem("token", tok);
      }
      else {
        localStorage.removeItem("token");
      }
    });


  }


  login(username: string, password: string) {
    return this.http.post<{token: string}>("http://localhost:8008/auth/login", {
      username: username,
      password: password
    }).pipe(tap(res => {
      this.token$.next(res.token);
    }));
  }

  getUserInfo(): Observable<User | null> {
    return this.userInfo$;
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
