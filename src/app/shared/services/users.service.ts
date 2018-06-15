import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {IUser} from '../models/user.model';

@Injectable()

export class UsersService {

  items$: Observable<IUser[]>;

  constructor( private db: AngularFireDatabase,
  ) {}

  public getUserByEmail(email: string): Observable<IUser[]> {
    const convEmail = email.toLowerCase();
    return this.items$ = this.db.list('/users', ref => ref.orderByChild('email').equalTo(convEmail)).valueChanges();
  }

}
