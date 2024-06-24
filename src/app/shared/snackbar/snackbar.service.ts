import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {
  }

  showSuccess(message: string) {
    this.show(message, 'snackbar-success')
  }

  showError(message: string) {
    this.show(message, 'snackbar-error')
  }

  private show(message: string, colorClass: string) {
    this._snackbar.open(message, 'X', {
      duration: 2000,
      panelClass: [colorClass]
    });
  }
}
