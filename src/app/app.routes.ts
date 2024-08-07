import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdoptionCenterComponent } from './components/adoption-center/adoption-center.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'adoption-center', component: AdoptionCenterComponent },
  { path: 'my-pets', component: MyPetsComponent },
  { path: '**', redirectTo: '/home' } // Redirect to home for any unknown routes
];