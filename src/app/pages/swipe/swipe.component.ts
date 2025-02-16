import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { AuthService } from '../../services/auth.service';
import { Pair } from '../../models/pair.model';
import { PairService } from '../../services/pair.service';
import { HobbyService } from '../../services/hobby.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonHobbiesDto } from '../../models/commonHobbies.dto';
import { BehaviorSubject, of, switchMap} from 'rxjs';

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
  private hobbyService = inject(HobbyService);

  allViewed = signal(false);
  loggedInUser = signal<User | null>(null);
  currentPair$ = new BehaviorSubject<Pair | null>(null);

  currentUser$ = this.currentPair$.pipe(switchMap(pair => {
    const loggedUser = this.loggedInUser();
    if (!pair || !loggedUser) return of(null);
    const currentId = (loggedUser.id == pair.firstUser.id) ? pair.secondUser.id : pair.firstUser.id;
    return this.userService.getUser(currentId);
  }));

  commonHobbies$ = this.currentUser$.pipe(switchMap(user =>
    this.hobbyService.getSimilarHobbies(this.loggedInUser()?.id ?? "", user?.id ?? "")
  ));



  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (user) => {
        this.loggedInUser.set(user);
        this.pairService.getNextPair(this.loggedInUser()?.id ?? "").subscribe((pair) => {
          if (!pair) {
            this.allViewed.set(true);
          }
          else {
            this.currentPair$.next(pair);
          }
        });
      }
    );
  }

  onHotClicked() {
    const loggedUser = this.loggedInUser();
    const currentPair = this.currentPair$.getValue();
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
    const currentPair = this.currentPair$.getValue()
    if(!loggedUser || !currentPair) return;
    this.pairService.setPairStatus(loggedUser.id, currentPair.pairId, "REJECTED").subscribe({
      next: () => this.advance(),
      error: (err) => alert(JSON.stringify(err)),
    });
  }

  advance() {
    this.pairService.getNextPair(this.loggedInUser()?.id ?? "").subscribe(pair =>  {
      if(pair) {
        this.currentPair$.next(pair);
      } else {
        this.allViewed.set(true);
      }
    });
  }

}
