import { Component } from '@angular/core';

import { AccountService, AlertService, NotificacionesService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private notificacionesService: NotificacionesService
  ) { }

  insertNotif() {
    this.notificacionesService.addNotificacion({
      usuario: this.account.id,
      title: 'Photos',
      color: 'primary',
      created: new Date('1/1/22'),
      icon: 'done',
      visto: false,
      routerLink: '/'
    }).subscribe(result => {
      this.alertService.success('Ok');
    }, err => this.alertService.error(err))
  }
}
