// noinspection JSNonASCIINames,NonAsciiCharacters

import {FormBuilder, FormControl, FormGroup, ɵElement} from "@angular/forms";
//todo: test
export class LoginForm {
  private readonly _form = this.formBuilder.group({
    email: new FormControl('', {updateOn: 'blur'}),
    password: new FormControl('', {updateOn: 'blur'})
  });

  constructor(private formBuilder: FormBuilder) {
  }

  hasInvalidEmail(): boolean {
    return this._form.touched && this._form.controls['email'].hasError('email') && !this._form.hasError('required')
  }

  hasMissingEmail() {
    return this._form.touched && this._form.controls['email'].hasError('required')
  }

  hasShortPassword(): boolean {
    return this._form.touched && this._form.controls['password'].hasError('password') && !this._form.hasError('required')
  }

  hasMissingPassword() {
    return this._form.touched && this._form.controls['password'].hasError('required')
  }

  reset() {
    this._form.reset();
  }

  get valid(): boolean {
    return this._form.valid;
  }

  get email(): string {
    return this._form.controls['email'].value ?? '';
  }

  get password(): string {
    return this._form.controls['password'].value ?? '';
  }

  get form(): FormGroup<{
    [K in keyof {
      password: FormControl<string | null>;
      email: FormControl<string | null>
    }]: ɵElement<{ password: FormControl<string | null>; email: FormControl<string | null> }[K], null>
  }> {
    return this._form;
  }
}
