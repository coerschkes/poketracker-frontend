import {Component, Inject, Type} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";

import {MatButton} from "@angular/material/button";
import {DataCarrierDialog} from "../../data-carrier-dialog";
import {ResponsiveConfigurationService} from "../../responsive-configuration.service";

export class ErrorDialog implements DataCarrierDialog {
  constructor(public title: string, public content: string) {
  }

  getCarrier(): Type<any> {
    return ErrorDialogComponent;
  }
}

@Component({
  selector: 'error-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialog: ErrorDialog, protected responsiveConfigurationService: ResponsiveConfigurationService) {
  }
}
