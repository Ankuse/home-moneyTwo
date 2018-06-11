import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'aks-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.styl']
})



export class BillCardComponent implements OnInit, OnChanges {

  @Input() currencyRub: any;
  @Input() currencyDollar: any;
  @Input() currencyEuro: any;
  @Input() calc: number;
  rub: number;
  dollar: number;
  euro: number;


  constructor() { }

  ngOnInit() {
    this.rub = this.currencyRub.Cur_OfficialRate * this.calc;
    this.dollar = this.currencyDollar.Cur_OfficialRate * this.calc;
    this.euro = this.currencyEuro.Cur_OfficialRate * this.calc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rub = this.currencyRub.Cur_OfficialRate / 100 * this.calc;
    this.dollar = this.currencyDollar.Cur_OfficialRate * this.calc;
    this.euro = this.currencyEuro.Cur_OfficialRate * this.calc;
  }
}
