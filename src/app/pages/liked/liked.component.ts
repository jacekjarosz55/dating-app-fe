import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { User } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PairService, RelatedPairs } from '../../services/pair.service';
import { AuthService } from '../../services/auth.service';
import { Pair } from '../../models/pair.model';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [AsyncPipe, ImgFallbackModule],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.css'
})
export class LikedComponent implements OnInit {

  private authService = inject(AuthService);
  private pairService = inject(PairService);

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(user => {
      this.currentUser = user;
      this.updateUsers();
    });
  }

  currentUser: User | null = null;
  related$ = new BehaviorSubject<RelatedPairs | null>(null);

  updateUsers() {
    this.pairService.getRelated(this.currentUser?.id ?? "").subscribe(related => {
      this.related$.next(related);
    });
  }

  reject(pair: Pair) {
    this.pairService.setPairStatus(this.currentUser?.id ?? "",  pair.pairId, "REJECTED").subscribe(() => {
      this.updateUsers();
    });
  }
  accept(pair: Pair) {
    this.pairService.setPairStatus(this.currentUser?.id ?? "",  pair.pairId, "ACCEPTED").subscribe(() => {
      this.updateUsers();
    });
  }

}
