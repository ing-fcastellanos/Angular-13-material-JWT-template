import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '@app/_models';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.less']
})
export class DialogsComponent{
  constructor(public dialog: MatDialog) { }
}

// Confirm Dialog  ********************************************************************************************************************************

@Component({
  selector: 'confirm_dialog',
  templateUrl: './regulars/confirm_dialog.html',
  styleUrls: ['./regulars/confirm_dialog.css']
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<MensajeSistema>,
    @Inject(MAT_DIALOG_DATA) public data: MensajeSistema) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface MensajeSistema {
  mensaje: string,
}

// Display Data Dialog  ********************************************************************************************************************************

@Component({
  selector: 'displayData',
  templateUrl: './regulars/displayData_dialog.html',
  styleUrls: ['./regulars/displayData_dialog.css']
})
export class displayDataDialog {

  constructor(
    public dialogRef: MatDialogRef<displayDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: displayDataData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface displayDataData {
  titulo: string,
  contenido: string,
  tabla: paramValue[]
}

export interface paramValue {
  param: string,
  value: string,
}

// User Account Data Dialog  ********************************************************************************************************************************

@Component({
  selector: 'userAccount_dialog',
  templateUrl: './account/userAccount_dialog.html',
  styleUrls: ['./account/userAccount_dialog.css']
})
export class userAccount_dialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<userAccount_dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Account) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
