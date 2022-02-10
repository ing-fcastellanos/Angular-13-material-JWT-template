import { AccountService, NotificacionesService } from '@app/_services';

export function appInitializer(accountService: AccountService, notificacionesService: NotificacionesService) {
  return () => new Promise(resolve => {
    // attempt to refresh token on app start up to auto authenticate
    accountService.refreshToken()
      .subscribe(acc => {
        notificacionesService.getNotificacionesUsuario().subscribe().add(resolve);
      })
  });
}
