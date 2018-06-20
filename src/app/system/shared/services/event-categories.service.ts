import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventCategoriesService {

  constructor( private db: AngularFireDatabase
  ) { }

  public pushEventCategory(): Observable<any> {
    return null;
  }

}
