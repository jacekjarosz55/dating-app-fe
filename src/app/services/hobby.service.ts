import { inject, Injectable } from '@angular/core';
import { Hobby } from '../models/hobby.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonHobbiesDto } from '../models/commonHobbies.dto';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor() { }

  private http = inject(HttpClient);

  getHobbies(): Observable<Hobby[]>  {
    return this.http.get<Hobby[]>(`http://localhost:8008/hobbies`);
  }


  getSimilarHobbies(userId: string, otherId: string) {
    return this.http.get<CommonHobbiesDto>(`http://localhost:8008/hobbies/similar-hobbies/${userId}/${otherId}`);
  }


}
