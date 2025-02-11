import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  readonly userInfo$ = this.authService.getUserInfo();
  readonly users$ = this.userService.getUsers();



}
