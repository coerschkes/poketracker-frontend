// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit, Signal, ViewChild} from '@angular/core';
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
import {SignupFormComponent} from "./signup-form/signup-form.component";
import {DialogService} from "../../../shared/dialog.service";
import {ErrorDialog} from "../../../shared/error/error-dialog/error-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {FirebaseApiError, FirebaseApiErrorFactory} from "../../external/firebase/firebase-api-error";
import {HttpStatusMapper} from "../../../shared/http-status-mapper";

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
    SignupFormComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private readonly _state: AuthComponentState;

  @ViewChild(LoginFormComponent)
  protected loginComponent: LoginFormComponent;
  @ViewChild(SignupFormComponent)
  protected signUpComponent: SignupFormComponent;

  constructor(private authService: AuthService, private router: Router, private dialogService: DialogService) {
    this._state = new AuthComponentState();
  }

  ngOnInit() {
    if (this.authService.tryLoginWithStoredCredentials()) {
      this.router.navigate(['/dashboard'])
    }
  }

  onSwitchMode() {
    this._state.toggleLoginMode();
    this.loginComponent?.loginForm.reset();
    this.signUpComponent?.signupForm.reset();
  }

  onSubmitLogin() {
    if (this.loginComponent.valid) {
      this._state.toggleLoading();
      const email: string = this.loginComponent.loginForm.email;
      const password: string = this.loginComponent.loginForm.password;
      this.basicLogin(email, password);
    }
  }

  onSubmitSignUp() {
    if (this.signUpComponent.valid) {
      this._state.toggleLoading();
      const email: string = this.signUpComponent.signupForm.email;
      const password: string = this.signUpComponent.signupForm.password;
      this.signUp(email, password);
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

  get signUpFormValid(): boolean {
    return this.signUpComponent !== undefined && this.signUpComponent!.signupForm.valid
  }

  basicLogin(email: string, password: string) {
    this.authenticationFlow(this.authService.basicLogin(email, password))
  }

  signUp(email: string, password: string) {
    this.authenticationFlow(this.authService.signUp(email, password));
  }

  private authenticationFlow(observable: Observable<any>): void {
    observable
      .pipe(
        first(),
        tap(() => {
          this._state.reset();
          this.router.navigate(['/dashboard'])
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            this.dialogService.openDialog(this.createErrorDialog(errorResponse));
            return of();
          },
        ),
        finalize(() => {
          this._state.toggleLoading();
        }),
      ).subscribe();
  }

  private createErrorDialog(response: HttpErrorResponse): ErrorDialog {
    const apiError: FirebaseApiError = FirebaseApiErrorFactory.fromResponse(response);
    return new ErrorDialog(
      'An error has occurred during authentication',
      'HTTP ' + apiError.code + ' (' + HttpStatusMapper.map(apiError.code) + ') ' + ': ' + apiError.message
    );
  }
}
