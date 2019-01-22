import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { RegistrationRequest } from '../domain/registration-requests';

@Injectable()
export class RegistrationRequestService {

  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  getRegistrationRequests(): Observable<Array<RegistrationRequest>>{
    return this.httpClient.get(this.baseUrl + 'api/RegistrationRequests/GetAll').pipe(map(res => <Array<RegistrationRequest>> res.json()));
  }

}
