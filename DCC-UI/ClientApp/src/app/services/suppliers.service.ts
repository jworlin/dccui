import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { supplier } from '../domain/supplier';

@Injectable()
export class SupplierService {

  constructor(private httpClient: Http, @Inject('BASE_URL') private baseUrl: string) { }

  getSuppliers(): Observable<Array<supplier>> {
    return this.httpClient.get(this.baseUrl + 'api/Supplier/GetAll').pipe(map(res => <Array<supplier>>res.json()));
  }
}
