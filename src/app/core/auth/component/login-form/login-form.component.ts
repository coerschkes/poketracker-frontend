import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
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
  private readonly _MIN_PASSWORD_LENGTH = 6;
  private readonly _errorStateMatcher: EmailErrorStateMatcher = new EmailErrorStateMatcher();
  private readonly _loginForm: LoginForm = new LoginForm(this.formBuilder)

  constructor(private formBuilder: FormBuilder) {
  }

  get valid(): boolean {
    return this._loginForm.valid
  }

  get loginForm(): LoginForm {
    return this._loginForm;
  }

  get MIN_PASSWORD_LENGTH(): number {
    return this._MIN_PASSWORD_LENGTH;
  }

  get errorStateMatcher(): EmailErrorStateMatcher {
    return this._errorStateMatcher;
  }
}
