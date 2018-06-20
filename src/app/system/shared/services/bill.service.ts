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

  public setBill(uid: string, bill: number): Promise<void> {
    const data = {
      value: bill
    };
    return this.db.object(`users/${uid}/bill`).update(data);
  }

  public getBill(uid: string): Observable<any> {
    return this.db.object(`users/${uid}/bill/`).valueChanges();
  }

  public updateBill(uid: string, value: number): void {
    const data = {
      value: value
    };
    this.db.object(`users/${uid}/bill`).update(data);
  }

  public getCurrency(currency: number = 145): Observable<any> {
    return this.http.get(`https://www.nbrb.by/API/ExRates/Rates/${currency}`);
  }
}
