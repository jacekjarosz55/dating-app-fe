import { Component, inject } from '@angular/core';
import { Form, FormGroup, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(NonNullableFormBuilder);

  private auth = inject(AuthService);

  error: string | null = null;

  readonly loginForm = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  private router = inject(Router);

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const data = form.value;
      this.auth.login(data.username, data.password).subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: () => {
          this.error = "Login lub hasło są nieprawidłowe.";
        }
      })

    }
  }


}
