import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css'
})
export class SwipeComponent {
  private userService = inject(UserService);

  userIdx = signal(0);
  usersLength = signal(0);
  allViewed = signal(false);

  // should get available
  readonly users$ = this.userService
    .getUsers()
    .pipe(takeUntilDestroyed(),
      tap(users => this.usersLength.set(users?.length ?? 1)));


  onHotClicked() {
    this.advance();
    // save user to liked
  }

  onNotClicked() {
    this.advance();
  }

  advance() {
    const nextIdx = this.userIdx() + 1;
    if(nextIdx >= this.usersLength()) {
      this.allViewed.set(true);
    }
    this.userIdx.set(nextIdx);
  }

}
