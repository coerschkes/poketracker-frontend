// noinspection JSNonASCIINames,NonAsciiCharacters

import {FormBuilder, FormControl, FormGroup, ɵElement} from "@angular/forms";

export class LoginForm {
  private static readonly _DEFAULT_UPDATE_POLICY = 'blur';
  private static readonly _ERROR_CODE_REQUIRED = 'required';
  private static readonly _ERROR_CODE_EMAIL = 'email';

  private readonly _form;

  constructor() {
    this._form = new FormBuilder().group({
      email: new FormControl('', {updateOn: LoginForm._DEFAULT_UPDATE_POLICY}),
      password: new FormControl('', {updateOn: LoginForm._DEFAULT_UPDATE_POLICY})
    });
  }

  hasInvalidEmail(): boolean {
    return this._email!.touched && this._email!.hasError(LoginForm._ERROR_CODE_EMAIL) && !this._form.hasError(LoginForm._ERROR_CODE_REQUIRED)
  }

  hasMissingEmail() {
    return this._email!.touched && this._email!.hasError(LoginForm._ERROR_CODE_REQUIRED)
  }

  hasMissingPassword() {
    return this._password!.touched && this._password!.hasError(LoginForm._ERROR_CODE_REQUIRED)
  }

  reset() {
    this._form.reset();
  }

  get valid(): boolean {
    return this._form.valid;
  }

  get email(): string {
    return this._email?.value ?? '';
  }

  get password(): string {
    return this._password?.value ?? '';
  }

  get form(): FormGroup<{
    [K in keyof {
      password: FormControl<string | null>;
      email: FormControl<string | null>
    }]: ɵElement<{ password: FormControl<string | null>; email: FormControl<string | null> }[K], null>
  }> {
    return this._form;
  }

  private get _email(): FormControl<string> {
    return this._form.get('email') as FormControl<string>;
  }

  private get _password(): FormControl<string> {
    return this._form.get('password') as FormControl<string>;
  }
}
