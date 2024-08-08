import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdoptionCenterComponent } from './components/adoption-center/adoption-center.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'adoption-center', component: AdoptionCenterComponent },
  { path: 'my-pets', component: MyPetsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },


  { path: '**', redirectTo: '/home' } // Redirect to home for any unknown routes
];