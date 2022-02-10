import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertComponent } from "../_components";

@Injectable({ providedIn: "root" })
export class AlertService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  success(message: string, alertTime = 5000) {
    var Class = 'successnackbar';
    this._snackBar.openFromComponent(AlertComponent, {
      duration: alertTime,
      panelClass: Class,
      data: { message: message, snackType: 'Success' }
    });
  }

  error(message: string, alertTime = 5000) {
    var Class = 'errorSnackbar';
    this._snackBar.openFromComponent(AlertComponent, {
      duration: alertTime,
      panelClass: Class,
      data: { message: message, snackType: 'Error' }
    });  }

  info(message: string, alertTime = 5000) {
    var Class = 'infoSnackbar';
    this._snackBar.openFromComponent(AlertComponent, {
      duration: alertTime,
      panelClass: Class,
      data: { message: message, snackType: 'Info' }
    });  }

  warn(message: string, alertTime = 5000) {
    var Class = 'warnSnackbar';
    this._snackBar.openFromComponent(AlertComponent, {
      duration: alertTime,
      panelClass: Class,
      data: { message: message, snackType: 'Warn' }
    });  }
}
