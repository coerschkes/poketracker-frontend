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
  {
    path: 'add',
    loadComponent: () => import('./add/add.component').then(m => m.AddComponent),
    canActivate: [LoginGuard.canActivate]
  },
  {
    path: 'edit',
    loadComponent: () => import('./edit/edit.component').then(m => m.EditComponent),
    canActivate: [LoginGuard.canActivate]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit/edit.component').then(m => m.EditComponent),
    canActivate: [LoginGuard.canActivate]
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.component').then(m => m.AccountComponent),
    canActivate: [LoginGuard.canActivate]
  },
  // todo: redirect to error page here
  {path: '**', redirectTo: 'dashboard'}
];
