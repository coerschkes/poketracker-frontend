// noinspection JSIgnoredPromiseFromCall

import {Component, Signal, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router, RouterLink} from "@angular/router";
import {catchError, finalize, first, Observable, of, tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {LoginFormComponent} from "./login-form/login-form.component";
import {AuthComponentState} from "./auth.component.state";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    MatFormField,
    MatError,
    MatHint,
    MatLabel,
    MatInput,
    MatDivider,
    MatCardActions,
    MatCardFooter,
    MatProgressBar,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    ReactiveFormsModule,
    LoginFormComponent,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly _authService: AuthService
  private readonly _router: Router
  private readonly _state: AuthComponentState;

  @ViewChild(LoginFormComponent)
  protected loginComponent: LoginFormComponent;

  constructor(authService: AuthService, router: Router) {
    this._authService = authService
    this._router = router
    this._state = new AuthComponentState();
  }

  onSwitchMode() {
    this._state.toggleLoginMode();
    this.loginComponent?.loginForm.reset();
  }

  onSubmitLogin() {
    if (this.loginComponent.valid) {
      this._state.toggleLoading();
      const email: string = this.loginComponent.loginForm.email;
      const password: string = this.loginComponent.loginForm.password;
      this.basicLogin(email, password);
    }
  }

  get loginMode(): Signal<boolean> {
    return this._state.isLoginMode;
  }

  get loading(): Signal<boolean> {
    return this._state.isLoading;
  }

  get loginFormValid(): boolean {
    return this.loginComponent !== undefined && this.loginComponent!.loginForm.valid
  }

  basicLogin(email: string, password: string) {
    this.authenticationFlow(this._authService.basicLogin(email, password),
      () => {
        this._state.reset();
        this._router.navigate(['/dashboard'])
      },
    )
  }

  signUp(email: string, password: string) {
    this.authenticationFlow(this._authService.signUp(email, password),
      () => {
        this._state.reset();
      },
    )
  }

  private authenticationFlow(observable: Observable<any>, nextCallback: () => void): void {
    observable
      .pipe(
        first(),
        tap(nextCallback),
        catchError(err => {
            //todo: show error on component
            console.log(err);
            return of();
          },
        ),
        finalize(() => {
          this._state.toggleLoading();
        }),
      ).subscribe();
  }
}
