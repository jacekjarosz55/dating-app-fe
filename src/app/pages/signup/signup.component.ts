import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HobbyService } from '../../services/hobby.service';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Hobby } from '../../models/hobby.model';
import { RegisterUserDto } from '../../models/register.dto';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  toggleHobby(hobby: Hobby) {
    if(this.selectedHobbies.includes(hobby)) {
      this.selectedHobbies = this.selectedHobbies.filter(x=>x.id != hobby.id);
    }
    else {
      this.selectedHobbies.push(hobby);
    }
  }

  private hobbyService = inject(HobbyService);
  private authService = inject(AuthService);
  private router = inject(Router);

  hobbies$ = this.hobbyService.getHobbies();
  selectedHobbies: Hobby[] = [];


  onSubmit(form: FormGroup) {

    const formData = this.signupForm.getRawValue();

    const data: RegisterUserDto = {
      ...formData,
      hobbies: this.selectedHobbies
    };

    this.authService.signup(data).subscribe(()=>{
      this.router.navigate(["/"]);
    });


  }

  error: string = "";

  private fb = inject(NonNullableFormBuilder);

  signupForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: [0, [Validators.required, Validators.pattern("[0-9]*")]],
    description: ['', [Validators.required, Validators.maxLength(512)]],
    profilePicture: ['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
    city: ['', [Validators.required]]
  });


  get hobbiesInvalid() {
    return this.selectedHobbies.length < 1;
  }
}

