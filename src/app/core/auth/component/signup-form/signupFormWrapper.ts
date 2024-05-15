// noinspection JSNonASCIINames,NonAsciiCharacters

import {FormBuilder, FormControl} from "@angular/forms";
import {matchValidator} from "./passwordRepeatValidator";

export class SignupFormWrapper {
  private static readonly _ERROR_CODE_REQUIRED = 'required';
  private static readonly _ERROR_CODE_EMAIL = 'email';

  private readonly _internalForm;

  constructor() {
    this._internalForm = new FormBuilder().group({
      email: new FormControl('', {updateOn: 'blur'}),
      password: new FormControl('', {updateOn: 'change', validators: matchValidator('repeatPassword', true)}),
      repeatPassword: new FormControl('', {updateOn: 'change', validators: matchValidator('password')})
    });
  }

  hasInvalidEmail(): boolean {
    return this._email!.touched && this._email!.hasError(SignupFormWrapper._ERROR_CODE_EMAIL) && !this._internalForm.hasError(SignupFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasMissingEmail() {
    return this._email!.touched && this._email!.hasError(SignupFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasMissingPassword() {
    return this._password!.touched && this._password!.hasError(SignupFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasMissingRepeatPassword() {
    return this._repeatPassword!.touched && this._repeatPassword!.hasError(SignupFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasInvalidRepeatPassword() {
    return this._repeatPassword!.touched &&
      !this.hasMissingPassword() &&
      this._repeatPassword!.hasError('matching')
  }

  reset() {
    this._internalForm.reset();
  }

  get valid(): boolean {
    return this._internalForm.valid;
  }

  get email(): string {
    return this._email?.value ?? '';
  }

  get password(): string {
    return this._password?.value ?? '';
  }

  get repeatPassword() {
    return this._repeatPassword?.value ?? '';
  }


  get internalForm() {
    return this._internalForm;
  }

  private get _email(): FormControl<string> {
    return this._internalForm.get('email') as FormControl<string>;
  }

  private get _password(): FormControl<string> {
    return this._internalForm.get('password') as FormControl<string>;
  }

  private get _repeatPassword(): FormControl<string> {
    return this._internalForm.get('repeatPassword') as FormControl<string>;
  }
}
