import {MatDialog} from "@angular/material/dialog";
import {Injectable} from "@angular/core";
import {DataCarrierDialog} from "./data-carrier-dialog";

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor(private dialog: MatDialog) {
  }

  openDialog<T extends DataCarrierDialog>(dialog: T) {
    this.dialog.open(dialog.getCarrier(), {data: dialog});
  }
}
