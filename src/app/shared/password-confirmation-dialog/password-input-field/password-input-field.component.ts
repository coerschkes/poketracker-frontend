import {Component, ViewEncapsulation} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ResponsiveConfigurationService} from "../../responsive-configuration.service";

@Component({
  selector: 'app-password-input-field',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './password-input-field.component.html',
  styleUrl: './password-input-field.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PasswordInputFieldComponent {
  readonly passwordForm = new FormControl('', [Validators.required]);

  constructor(protected responsive: ResponsiveConfigurationService) {
  }

  get theme(): string {
    if (!this.responsive.isDarkMode()) {
      if (this.passwordForm.invalid && this.passwordForm.touched) {
        return 'error-theme';
      } else {
        return 'light-theme';
      }
    } else {
      return '';
    }
  }

  get valid(): boolean {
    return !this.passwordForm.dirty || this.passwordForm.value === null || this.passwordForm.value === ''
  }
}
