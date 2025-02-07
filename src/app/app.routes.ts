import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import canActivateRequireLogin from './guards/requireLogin';

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
    path: "home",
    canActivate: [canActivateRequireLogin],
    component: HomeComponent
  }


];
