import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _message: string
  private _colorClass: string

  constructor(private _snackbar: MatSnackBar) {
  }

  show() {
    this._snackbar.open(this._message, 'X', {
      duration: 2000,
      panelClass: [this._colorClass]
    });
  }

  set message(value: string) {
    this._message = value;
  }

  set colorClass(value: string) {
    this._colorClass = value;
  }
}
