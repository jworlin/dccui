import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Intervention } from './intervention';

@Injectable()
export class InterventionService {
  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  intervene(intervention: Intervention) {
    console.log(this.baseUrl + 'api/Intervention');
    return this.httpClient.post(this.baseUrl + 'api/Intervention',intervention);
}
}
