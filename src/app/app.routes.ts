import { Routes } from '@angular/router';
import { ExperienceComponent } from './pages/experience/experience.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: '**', redirectTo: '' },
];
