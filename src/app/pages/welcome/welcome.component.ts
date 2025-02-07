import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {

    const token = this.authService.getToken();

    token.pipe(takeUntilDestroyed()).subscribe(token => {
    if(token) {
      this.router.navigate(["/", "home"]);
    }
    })

  }
}
