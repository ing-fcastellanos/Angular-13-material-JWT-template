import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

const baseUrl = `${environment.apiUrl}/notifications`;

@Injectable({ providedIn: "root" })
export class NotificacionesService {

  private NotificacionesSubject: BehaviorSubject<Notificacion[]>;
  public Notificaciones: Observable<Notificacion[]>;

  constructor(
    private http: HttpClient,
  ) {
    this.NotificacionesSubject = new BehaviorSubject<Notificacion[]>(null);
    this.Notificaciones = this.NotificacionesSubject.asObservable();
  }

  public get NotificationValue(): Notificacion[] {
    return this.NotificacionesSubject.value;
  }

  addNotificacion(notificacion: Notificacion) {
    const body = JSON.stringify(notificacion);
    const headers = { 'content-type': 'application/json' };
    return this.http.post<{ message: string, Respuesta: any }>(baseUrl, body, { 'headers': headers });
  }

  getNotificacionesUsuario() {
    return this.http.get<Notificacion[]>(baseUrl, { withCredentials: true }).pipe(map(notifications => {
      this.NotificacionesSubject.next(notifications);
      return notifications;
    }));
  }

  updateNotificacion(notificacionId: string,) {
    const headers = { 'content-type': 'application/json' };
    return this.http.put<{ message: string, Respuesta: any }>(baseUrl + '/' + notificacionId, [], { 'headers': headers })
  }
}
