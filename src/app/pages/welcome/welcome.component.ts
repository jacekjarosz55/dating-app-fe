import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private userService = inject(UserService);
  readonly users$ = this.userService.getUsers();



}
