import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, tap, window } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { PairService } from '../../services/PairService';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { AuthService } from '../../services/auth.service';
import { Pair } from '../../models/pair.model';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [RouterLink, ImgFallbackModule, AsyncPipe],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css'
})
export class SwipeComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private pairService = inject(PairService);

  allViewed = signal(false);
  loggedInUser = signal<User | null>(null);
  currentPair = signal<Pair | null>(null);

  currentUser$ = computed(() => {
    const pair = this.currentPair();
    const loggedUser = this.loggedInUser();
    if (!pair || !loggedUser) return null;
    const currentId = (loggedUser.id == pair.firstUserID) ? pair.secondUserID : pair.firstUserID;
    return this.userService.getUser(currentId);
  });


  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (user) => {
        this.loggedInUser.set(user);
        this.pairService.getNextPair(this.loggedInUser()?.id ?? "").subscribe((pair) => {
          if (!pair) {
            this.allViewed.set(true);
          }
          else {
            this.currentPair.set(pair);
          }
        });
      }
    );
  }

  onHotClicked() {
    const loggedUser = this.loggedInUser();
    const currentPair = this.currentPair();
    if(!loggedUser || !currentPair) return;
    this.pairService.setPairStatus(loggedUser.id, currentPair.pairId, "ACCEPTED").subscribe({
      next: () => this.advance(),
      error: (err) => alert(JSON.stringify(err)),
    });
    //this.advance();

    // save user to liked
  }

  onNotClicked() {
    const loggedUser = this.loggedInUser();
    const currentPair = this.currentPair();
    if(!loggedUser || !currentPair) return;
    this.pairService.setPairStatus(loggedUser.id, currentPair.pairId, "REJECTED").subscribe({
      next: () => this.advance(),
      error: (err) => alert(JSON.stringify(err)),
    });
  }

  advance() {
    this.pairService.getNextPair(this.loggedInUser()?.id ?? "").subscribe(pair =>  {
      if(pair) {
      this.currentPair.set(pair);
      } else {
        this.allViewed.set(true);
      }


    });
  }

}
