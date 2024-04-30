// noinspection JSIgnoredPromiseFromCall

import {Component, Signal} from '@angular/core';
import {FormControl, FormGroupDirective, FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {Router} from "@angular/router";
import {catchError, finalize, first, Observable, of, tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {ErrorStateMatcher} from "@angular/material/core";
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
//todo: style
export class AuthComponent {
  protected readonly MIN_PASSWORD_LENGTH = 6;
  private readonly authService: AuthService
  private readonly authComponentStateService: AuthComponentStateService
  private readonly router: Router

  matcher = new MyErrorStateMatcher();

  constructor(authService: AuthService, authComponentStateService: AuthComponentStateService, router: Router) {
    this.authService = authService
    this.authComponentStateService = authComponentStateService
    this.router = router
  }

  onSwitchMode() {
    this.authComponentStateService.switchLoginMode()
  }

  onSubmit(authForm: NgForm) {
    if (authForm.valid) {
      this.authComponentStateService.switchLoading()
      this.authComponentStateService.authForm = authForm
      const email: string = authForm.value.email
      const password: string = authForm.value.password
      if (this.authComponentStateService.isLoginMode()) {
        this.basicLogin(email, password)
      } else {
        this.signUp(email, password)
      }
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

  public log(form: NgForm): void {
    console.log(form)
  }
}
