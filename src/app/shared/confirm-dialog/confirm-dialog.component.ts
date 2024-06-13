import {Component, Inject, Type} from '@angular/core';
import {DataCarrierDialog} from "../data-carrier-dialog";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {ResponsiveConfigurationService} from "../responsive-configuration.service";

export class ConfirmDialog implements DataCarrierDialog {
  constructor(public title: string, public content: string, public callback: (confirmation: boolean) => void) {
  }

  getCarrier(): Type<any> {
    return ConfirmDialogComponent;
  }
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public dialog: ConfirmDialog, protected responsive: ResponsiveConfigurationService) {
  }

  onConfirm(b: boolean) {
    this.dialog.callback(b);
  }
}
