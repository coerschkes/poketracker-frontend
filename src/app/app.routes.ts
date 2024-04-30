import {Routes} from '@angular/router';
import {AuthComponent} from "./core/auth/component/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginGuard} from "./core/auth/login.guard";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard.canActivate]},
  {path: '', component: DashboardComponent, canActivate: [LoginGuard.canActivate]},
  {path: '**', redirectTo: 'dashboard'}
];
//todo: add page not found component and add back to root button / redirect in ... seconds to root
//todo: test routing
