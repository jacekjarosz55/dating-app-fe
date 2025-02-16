import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Pair } from "../models/pair.model";
import { PairStatus } from "../models/pairStatus.model";
import { UserService } from "./user.service";


export interface RelatedPairs {
  awaitingFor: Pair[],
  acceptedFrom: Pair[],
  matched: Pair[],
}

@Injectable({
  providedIn: 'root'
})
export class PairService {
  private userService = inject(UserService);

  private http = inject(HttpClient);

  getNextPair(userId: string): Observable<Pair | null> {
    return this.http.post(`http://localhost:8008/pairs/next?userId=${userId}`, {}).pipe(map(obj => obj as Pair | null));
  }

  setPairStatus(userId: string, pairId: string, status: PairStatus) {
    return this.http.put(`http://localhost:8008/pairs/change-pair-status?pairId=${pairId}&userId=${userId}&status=${status}`, {}, { responseType: 'text' });
  }



  getRelated(userId: string) {
    return this.http.get<Pair[]>(`http://localhost:8008/pairs`).pipe(
      map(pairs => {
        return {
          awaitingFor: pairs.filter(pair => (pair.firstUserID == userId && pair.firstUserPairStatus == "ACCEPTED" && pair.secondUserPairStatus == "WAITING_FOR_RESPONSE") || (pair.secondUserID == userId && pair.secondUserPairStatus == "ACCEPTED" && pair.firstUserPairStatus == "WAITING_FOR_RESPONSE")),
          acceptedFrom: pairs.filter(pair => (pair.firstUserID == userId && pair.firstUserPairStatus == "WAITING_FOR_RESPONSE" && pair.secondUserPairStatus == "ACCEPTED") || (pair.secondUserID == userId && pair.secondUserPairStatus == "WAITING_FOR_RESPONSE" && pair.firstUserPairStatus == "ACCEPTED")),
          matched: pairs.filter(pair => (pair.firstUserID == userId || pair.secondUserID == userId) && pair.firstUserPairStatus == "ACCEPTED" && pair.secondUserPairStatus == "ACCEPTED"),
        }
      }));
  }

  get(userId: string) {
    return this.http.get<Pair[]>(`http://localhost:8008/pairs`).pipe(
      map(pairs => pairs.filter(pair =>
        (pair.firstUserID == userId && pair.firstUserPairStatus == "ACCEPTED")
        || (pair.secondUserID == userId && pair.secondUserPairStatus == "ACCEPTED")
      )));
  }
}


