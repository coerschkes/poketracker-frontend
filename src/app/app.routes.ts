import {Routes} from '@angular/router';
import {LoginGuard} from "./core/auth/login.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/component/auth.component').then(m => m.AuthComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [LoginGuard.canActivate]
  },
  // todo: redirect to error page here
  {path: '**', redirectTo: 'dashboard'}
];
