import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../../../shared/services/auth.service';

@Injectable()
export class CategoriesService {

  constructor( private db: AngularFireDatabase,
               private afAuth: AuthService,
  ) { }

  addCategories(category: object) {
    this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        const path = `users/${val.uid}/bill`;
        this.db.object(path).update(category);
      }
    });
  }
}
