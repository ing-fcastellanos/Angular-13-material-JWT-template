import { Component, OnInit } from '@angular/core';

import { AccountService, NotificacionesService } from './_services';
import { Account, Role, Notificacion } from './_models';
import { listaModulos } from './listaModulos'
import { MatDialog } from '@angular/material/dialog';
import { userAccount_dialog } from '@app/_dialogs/dialogs.component';

import { Option } from "./_themes/option.model";
import { ThemeService } from "./_themes/theme.service";
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  Role = Role;
  account: Account;
  notifications: Notificacion[];
  listaModulos: any[];
  options: Observable<Array<Option>> = this.themeService.getThemeOptions();
  defaultTheme = "indigo-pink";

  constructor(
    private accountService: AccountService,
    private notificacionesService: NotificacionesService,
    private readonly themeService: ThemeService,
    public dialog: MatDialog
    ) {
    Object.assign(this, { listaModulos });
    this.accountService.account.subscribe(x => this.account = x);
    this.notificacionesService.Notificaciones.subscribe(x => this.notifications = x);
  }

  ngOnInit(): void {
    moment.locale('es');
    this.themeService.setTheme(this.account ? this.account.theme : this.defaultTheme);
  }

  getYear(){
    return (new Date()).getFullYear();
  }

  accesoFuncionalidad(listaAccesos: string, funcId: string) {
    return true;
  }

  logout() {
    this.accountService.logout();
  }

  showDatosUsuario(){
    this.dialog.open(userAccount_dialog, {
      data: this.account,
      width: '40%',
    });
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

  getTimeAgo(dateInput){
    if (!dateInput) return '';
    else {
      return moment(dateInput).fromNow();
    }
  }

  getNotificacionesSinVer() {
    if(this.notifications.length === 0) return null;
    return this.notifications.filter(x => x.visto === false).length;
  }

  notifComplete(e){
    const notId = e.option.value;
    this.notificacionesService.updateNotificacion(notId).subscribe();
    this.notifications = this.notifications.filter(x => x._id != notId);
  }
}
