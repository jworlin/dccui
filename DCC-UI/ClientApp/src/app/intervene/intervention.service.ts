import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Intervention } from './intervention';
import { RegistrationRequest } from '../domain/registration-requests';
import { Audit } from '../domain/audit';

@Injectable()
export class InterventionService {
  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  intervene(intervention:Intervention) {
    return this.httpClient.post(this.baseUrl + 'api/Intervention',intervention);
}
}
