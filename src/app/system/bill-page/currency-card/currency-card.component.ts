import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'aks-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.styl']
})

export class CurrencyCardComponent implements OnInit, OnChanges {

  @Input() currencyRub: any;
  @Input() currencyDollar: any;
  @Input() currencyEuro: any;
  @Input() calc: number;

  dollar: number;
  euro: number;
  rub: number;
  date: string;

  constructor() { }

  ngOnInit(): void {
    this.date = this.currencyDollar.Date;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dollar = this.calc / this.currencyDollar.Cur_OfficialRate;
    this.euro = this.calc / this.currencyEuro.Cur_OfficialRate;
    this.rub = this.calc / this.currencyRub.Cur_OfficialRate;

  }

}
