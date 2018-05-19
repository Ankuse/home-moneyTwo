import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()

export class UsersService {
  items: Observable<any>;
  constructor( private afs: AngularFireDatabase ) {}

  getUserByEmail(email: string): Observable<any> {
    return this.items = this.afs.list('/users', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
        .map( (user) => {
          if (user[0]) {
            return user[0];
          }
        });
    // return this.afs.collection('users',  ref => ref.where('email', '==', email) ).valueChanges();
  }

  createNewUser(user) {
    return this.afs.list('users').push(user);
    // return this.afs.collection('users').add(user);
  }
}
