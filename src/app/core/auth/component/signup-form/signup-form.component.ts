import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmailErrorStateMatcher} from "../emailErrorStateMatcher";
import {SignupFormWrapper} from "./signupFormWrapper";

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  private static readonly _ERROR_STATE_MATCHER: EmailErrorStateMatcher = new EmailErrorStateMatcher();
  @Output("submitCallback") submitCallback: EventEmitter<any> = new EventEmitter();

  private readonly _signupForm: SignupFormWrapper;

  constructor() {
    this._signupForm = new SignupFormWrapper();
  }

  get valid(): boolean {
    return this._signupForm.valid
  }

  get signupForm(): SignupFormWrapper {
    return this._signupForm;
  }

  get ERROR_STATE_MATCHER(): EmailErrorStateMatcher {
    return SignupFormComponent._ERROR_STATE_MATCHER;
  }

  submit() {
    this.submitCallback.emit();
  }
}
