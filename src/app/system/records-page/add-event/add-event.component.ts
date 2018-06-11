import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aks-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.styl']
})
export class AddEventComponent implements OnInit {

  categories: Array<object>;

  constructor() { }

  ngOnInit() {
    this.categories = [
      { name: 'Первая категория' },
      { name: 'Вторая категория' }
    ];
  }

}
