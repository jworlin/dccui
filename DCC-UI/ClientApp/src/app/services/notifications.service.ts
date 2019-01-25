
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Notification } from '../domain/notification';

@Injectable()
export class NotificationService {

  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  getNotifications(id: string): Observable<Array<Notification>> {
    return this.httpClient.get(this.baseUrl + 'api/notifications/for/' + id).pipe(map(res => <Array<Notification>>res.json()));
  }
}
