import {ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LoginFormWrapper} from "./loginFormWrapper";
import {EmailErrorStateMatcher} from "./emailErrorStateMatcher";
import {Component} from "@angular/core";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatLabel
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private static readonly _ERROR_STATE_MATCHER: EmailErrorStateMatcher = new EmailErrorStateMatcher();

  private readonly _loginForm: LoginFormWrapper;


  constructor() {
    this._loginForm = new LoginFormWrapper();
  }

  get valid(): boolean {
    return this._loginForm.valid
  }

  get loginForm(): LoginFormWrapper {
    return this._loginForm;
  }

  get ERROR_STATE_MATCHER(): EmailErrorStateMatcher {
    return LoginFormComponent._ERROR_STATE_MATCHER;
  }
}
