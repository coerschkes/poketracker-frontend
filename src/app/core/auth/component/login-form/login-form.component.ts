import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LoginForm} from "./loginForm";
import {AuthFormErrorStateMatcher} from "./authFormErrorStateMatcher";
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
//todo: refactor & style
export class LoginFormComponent {
  protected readonly MIN_PASSWORD_LENGTH = 6;
  protected readonly errorStateMatcher: AuthFormErrorStateMatcher = new AuthFormErrorStateMatcher();

  loginForm: LoginForm = new LoginForm(this.formBuilder)

  constructor(private formBuilder: FormBuilder) {
  }

  isValid(): boolean {
    return this.loginForm.valid
  }
}
