import {Component, Inject, Type} from '@angular/core';
import {DataCarrierDialog} from "../data-carrier-dialog";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {ResponsiveConfigurationService} from "../responsive-configuration.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordInputFieldComponent} from "./password-input-field/password-input-field.component";

export class PasswordConfirmationDialog implements DataCarrierDialog {
  constructor(public title: string, public content: string, public callback: (passwordEntered: string) => void) {
  }

  getCarrier(): Type<any> {
    return PasswordConfirmationDialogComponent;
  }
}

@Component({
  selector: 'app-password-confirmation-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    PasswordInputFieldComponent
  ],
  templateUrl: './password-confirmation-dialog.component.html',
  styleUrl: './password-confirmation-dialog.component.scss',
})
export class PasswordConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialog: PasswordConfirmationDialog, protected responsive: ResponsiveConfigurationService) {
  }

  onConfirm(value: string) {
    this.dialog.callback(value);
  }
}
