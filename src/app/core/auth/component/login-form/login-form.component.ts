import {ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LoginForm} from "./loginForm";
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
  private static readonly _MIN_PASSWORD_LENGTH = 6;
  private static readonly _ERROR_STATE_MATCHER: EmailErrorStateMatcher = new EmailErrorStateMatcher();

  private readonly _loginForm: LoginForm;


  constructor() {
    this._loginForm = new LoginForm();
  }

  get valid(): boolean {
    return this._loginForm.valid
  }

  get loginForm(): LoginForm {
    return this._loginForm;
  }

  get MIN_PASSWORD_LENGTH(): number {
    return LoginFormComponent._MIN_PASSWORD_LENGTH;
  }

  get ERROR_STATE_MATCHER(): EmailErrorStateMatcher {
    return LoginFormComponent._ERROR_STATE_MATCHER;
  }
}
