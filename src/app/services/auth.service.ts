import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap, map } from 'rxjs';
import { User } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

interface TokenInfo {
  token: string;
  expiresAt: Date;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private token$ = new BehaviorSubject<TokenInfo | null>(null);

  private userInfo$ = this.token$.pipe(switchMap(token => {
    if (token == null) return of(null);
    return this.http.get<User>("http://localhost:8008/auth/me");
  }));

  constructor() {
    const loadedToken = localStorage.getItem("token");
    if (loadedToken) {
      const info = JSON.parse(loadedToken) as TokenInfo;
      if (info) {

        const expiryDate = new Date(info.expiresAt);
        if (expiryDate.getTime() < new Date().getTime()) {
          localStorage.removeItem("token");
          return;
        }

        this.token$.next(info);
      }
    }



    this.token$.pipe(takeUntilDestroyed()).subscribe(tok => {
      if (tok) {
        localStorage.setItem("token", JSON.stringify(tok));
      }
      else {
        localStorage.removeItem("token");
      }
    });
  }



  login(username: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number }>("http://localhost:8008/auth/login", {
      username: username,
      password: password
    }).pipe(tap(res => {
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + res.expiresIn);
      this.token$.next(
        {
          token: res.token,
          expiresAt: expiryDate
        });
    }));
  }

  getUserInfo(): Observable<User | null> {
    return this.userInfo$;
  }

  logout() {
    this.token$.next(null);
    this.router.navigate(["/"]);
  }

  getToken(): Observable<string | null> {
    return this.token$
      .asObservable()
      .pipe(map(x => x?.token ?? null));
  }

  tokenValue(): string | null {
    return this.token$.getValue()?.token ?? null;
  }
}
