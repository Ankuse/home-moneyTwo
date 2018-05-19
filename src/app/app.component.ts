import {Component, OnInit} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'aks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  items: Observable<any>;
  newContent: string;
  constructor( private db: AngularFirestore ) {
    this.items = db.collection('users').valueChanges();
  }
  addItem() {
    this.db.collection('users').add( {} );
  }
}
