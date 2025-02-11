import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { User } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private users$ = new BehaviorSubject<User[] | null>(null);

  constructor() {
    setTimeout(() => {
    this.http.get<User[]>("http://localhost:8008/users")
      .subscribe(
      users => this.users$.next(users)
    );
    }, 1000);
  }


  getUsers(): Observable<User[] | null>  {
    return this.users$.asObservable();
  }

  getUser(id: string): Observable<User>  {
    return this.http.get<User>(`http://localhost:8008/users/${id}`)
  }

}
