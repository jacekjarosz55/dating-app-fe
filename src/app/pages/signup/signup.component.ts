import { Component, inject } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HobbyService } from '../../services/hobby.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private hobbyService = inject(HobbyService);

  readonly hobbies$ = this.hobbyService.getHobbies();

  onSubmit(form: FormGroup) {
    throw new Error('Method not implemented.');
  }

  error: string = "";


  private fb = inject(NonNullableFormBuilder);
  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required]],
    profilePicture: ['', [Validators.required]],
    fbLink: ['', [Validators.required]],
    hobbies: this.fb.array([]),
  });


  get hobbies() {
    return this.signupForm.controls.hobbies as FormArray;
  }






}
