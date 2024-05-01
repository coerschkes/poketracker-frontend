// noinspection JSIgnoredPromiseFromCall

import {Component, Signal, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {Router} from "@angular/router";
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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly authService: AuthService
  private readonly authComponentStateService: AuthComponentStateService
  private readonly router: Router
  @ViewChild(LoginFormComponent)
  protected loginComponent: LoginFormComponent;

  constructor(authService: AuthService, authComponentStateService: AuthComponentStateService, router: Router) {
    this.authService = authService
    this.authComponentStateService = authComponentStateService
    this.router = router
  }

  onSwitchMode() {
    this.authComponentStateService.switchLoginMode()
    this.loginComponent.loginForm.reset();
  }

  //todo: refactor when sign up is implemented
  onSubmitLogin() {
    if (this.loginComponent.valid) {
      this.authComponentStateService.switchLoading()
      const email: string = this.loginComponent.loginForm.email
      const password: string = this.loginComponent.loginForm.password
      this.basicLogin(email, password)
    }
  }

  basicLogin(email: string, password: string) {
    this.authenticationFlow(this.authService.basicLogin(email, password),
      () => {
        this.authComponentStateService.reset()
        this.router.navigate(['/dashboard'])
      },
    )
  }

  signUp(email: string, password: string) {
    this.authenticationFlow(this.authService.signUp(email, password),
      () => {
        this.authComponentStateService.reset()
        this.authComponentStateService.switchLoginMode()
      },
    )
  }

  get loginMode(): Signal<boolean> {
    return this.authComponentStateService.isLoginMode
  }

  private authenticationFlow(observable: Observable<any>, nextCallback: () => void): void {
    observable
      .pipe(
        first(),
        tap(nextCallback),
        catchError(err => {
            //todo: show error on component
            console.log(err)
            return of()
          },
        ),
        finalize(() => {
          this.authComponentStateService.switchLoading()
        }),
      ).subscribe()
  }
}
