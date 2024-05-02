// noinspection JSNonASCIINames,NonAsciiCharacters

import {FormBuilder, FormControl, FormGroup, ɵElement} from "@angular/forms";

export class LoginFormWrapper {
  private static readonly _ERROR_CODE_REQUIRED = 'required';
  private static readonly _ERROR_CODE_EMAIL = 'email';

  private readonly _internalForm;

  constructor() {
    this._internalForm = new FormBuilder().group({
      email: new FormControl('', {updateOn: 'blur'}),
      password: new FormControl('', {updateOn: 'change'})
    });
  }

  hasInvalidEmail(): boolean {
    return this._email!.touched && this._email!.hasError(LoginFormWrapper._ERROR_CODE_EMAIL) && !this._internalForm.hasError(LoginFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasMissingEmail() {
    return this._email!.touched && this._email!.hasError(LoginFormWrapper._ERROR_CODE_REQUIRED)
  }

  hasMissingPassword() {
    return this._password!.touched && this._password!.hasError(LoginFormWrapper._ERROR_CODE_REQUIRED)
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

  get internalForm(): FormGroup<{
    [K in keyof {
      password: FormControl<string | null>;
      email: FormControl<string | null>
    }]: ɵElement<{ password: FormControl<string | null>; email: FormControl<string | null> }[K], null>
  }> {
    return this._internalForm;
  }

  private get _email(): FormControl<string> {
    return this._internalForm.get('email') as FormControl<string>;
  }

  private get _password(): FormControl<string> {
    return this._internalForm.get('password') as FormControl<string>;
  }
}
