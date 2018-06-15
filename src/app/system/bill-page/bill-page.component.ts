import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BillService} from '../shared/services/bill.service';

@Component({
  selector: 'aks-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.styl']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  currencyRub: any;
  currencyDollar: any;
  currencyEuro: any;
  isLoaded = false;
  calc: number;

  constructor( private billService: BillService
  ) { }

  ngOnInit(): void {
    this.sub1 = Observable.combineLatest(
        this.billService.getCurrency(), // dollar
        this.billService.getCurrency(292), // euro
        this.billService.getCurrency(298), // rub
    ).subscribe((val) => {
      this.currencyDollar = val[0];
      this.currencyEuro = val[1];
      this.currencyRub = val[2];
      this.isLoaded = true;
    });
  }

  public onRefresh(): void {
    this.isLoaded = false;
    this.sub2 = Observable.combineLatest(
        this.billService.getCurrency(),
        this.billService.getCurrency(292),
        this.billService.getCurrency(298),
    ).subscribe((val) => {
      this.currencyDollar = val[0];
      this.currencyEuro = val[1];
      this.currencyRub = val[2];
      this.isLoaded = true;
    });
  }

  public eventCalcEvent(event: Event): void {
    this.calc = Number(event);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    } else if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
