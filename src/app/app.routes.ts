import { Router, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdoptionCenterComponent } from './components/adoption-center/adoption-center.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PetManagementComponent } from './components/admin/Pets/pet-management/pet-management.component';
import { AddPetComponent } from './components/admin/Pets/add-pet/add-pet.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';



const authGuard = () => {
  debugger
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isTokenExpired())
    return true;
  router.navigate(['/login'])
  return false;
};

const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isTokenExpired() && authService.getRole() == 'Admin')
    return true;
  router.navigate(['/home']);
  return false;
};


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'adoption-center', component: AdoptionCenterComponent, canActivate: [authGuard] },
  { path: 'my-pets', component: MyPetsComponent, canActivate: [authGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pets', component: PetManagementComponent },
      { path: 'pets/add', component: AddPetComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/home' }
];