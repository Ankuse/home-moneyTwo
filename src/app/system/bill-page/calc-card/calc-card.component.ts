import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'aks-calc-card',
  templateUrl: './calc-card.component.html',
  styleUrls: ['./calc-card.component.styl']
})

export class CalcCardComponent implements OnInit {

  calculated = 1;
  @Output() calc = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.calc.emit(Number(this.calculated));
  }

  public getOutValue(event: Event): void {
    this.calculated = Number((<HTMLInputElement>event.target).value);
    this.calc.emit(Number(this.calculated));
  }

}
