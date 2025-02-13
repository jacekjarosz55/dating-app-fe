import { inject, Injectable } from '@angular/core';
import { Hobby } from '../models/hobby.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor() { }

  private http = inject(HttpClient);

  getHobbies(): Observable<Hobby[]>  {
    return this.http.get<Hobby[]>(`http://localhost:8008/hobbies`);
  }
}
