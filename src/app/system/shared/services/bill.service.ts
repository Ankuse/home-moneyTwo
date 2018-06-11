import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Bill} from '../models/bill.model';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class BillService {
  constructor( private http: HttpClient,
               private db: AngularFireDatabase,
  ) { }

  getBill(): Observable<Bill[]> {
    return this.db.list('/bill').valueChanges();
  }

  getCurrency(currency: number = 145): Observable<any> {
    return this.http.get(`https://www.nbrb.by/API/ExRates/Rates/${currency}`);
  }
}
