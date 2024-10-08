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
import { EditPetComponent } from './components/admin/Pets/edit-pet/edit-pet.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isTokenExpired()) {
    return true;
  }
  else{
    router.navigate(['/landing-page'])
    return false;
  }
};

const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isTokenExpired() && authService.getRole() == 'Admin')
    return true;
  router.navigate(['/landing-page'])
  return false;
};


export const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'adoption-center', component: AdoptionCenterComponent, canActivate: [authGuard] },
  { path: 'my-pets', component: MyPetsComponent, canActivate: [authGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landing-page', component: LandingPageComponent },

  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pets', component: PetManagementComponent },
      { path: 'pets/add', component: AddPetComponent },{
        path: 'pets/edit/:id',
        component: EditPetComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/landing-page' }
];