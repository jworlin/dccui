import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { registeredMeterPoint } from '../domain/registered-meter-point';

@Injectable()
export class RegisteredMeterPointService {

  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  getPoints(): Observable<Array<registeredMeterPoint>> {
    return this.httpClient.get(this.baseUrl + 'api/RegisteredMeterPoint/GetAll').pipe(map(res => <Array<registeredMeterPoint>>res.json()));
  }
}
