import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.css'
})
export class LikedComponent {

  private userService = inject(UserService);
  likedUsers$ = this.userService.getUsers();

}
