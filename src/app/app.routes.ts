import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import canActivateRequireLogin from './guards/requireLogin';
import { SwipeComponent } from './pages/swipe/swipe.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LikedComponent } from './pages/liked/liked.component';

export const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "home",
    canActivate: [canActivateRequireLogin],
    component: HomeComponent
  },
  {
    path: "swipe",
    canActivate: [canActivateRequireLogin],
    component: SwipeComponent
  },
  {
    path: "liked",
    canActivate: [canActivateRequireLogin],
    component: LikedComponent
  }
];
