import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { PairService, RelatedPairs } from '../../services/pair.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [AsyncPipe, ImgFallbackModule],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.css'
})
export class LikedComponent implements OnInit {
  ngOnInit(): void {
    this.updateUsers();
  }


  updateUsers() {
    this.authService.getUserInfo().subscribe(user => {
      this.pairService.getRelated(user?.id ?? "").subscribe(related => {
        this.related$.next(related);
      })
    });
  }

  private authService = inject(AuthService);
  private pairService = inject(PairService);
  related$ = new BehaviorSubject<RelatedPairs | null>(null);


}
