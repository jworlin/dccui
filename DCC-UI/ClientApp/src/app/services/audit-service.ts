import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Audit } from '../domain/audit';

@Injectable()
export class AuditService {

  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  getAuditRequests(id: string): Observable<Array<Audit>> {
    return this.httpClient.get(this.baseUrl + 'api/Audit/audit/' + id).pipe(map(res => <Array<Audit>>res.json()));
  }
}
