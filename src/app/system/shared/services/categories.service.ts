import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoriesService {

  items: Observable<any[]>;

  constructor( private db: AngularFireDatabase,
  ) { }

  getCategiriesList(uid): Observable<any> {
    return this.items = this.db.list(`users/${uid}/bill`).snapshotChanges().pipe(
        map( (changes) => (
            changes.map( (c) =>
                (
                    { key: c.payload.key, ...c.payload.val() }
                )
            )
        ))
    );
  }

  addCategories(uid: string, category: object) {
    const path = `users/${uid}/bill`;
    this.db.list(path).push(category);
  }

  getCategories(uid): Observable<any> {
    const path = `users/${uid}/bill`;
    return this.db.list(path).valueChanges();
  }

  updateCategories( uid: string, select: string, key: string, newName: string, newLimit: number ): Observable<any> {
    const path = `users/${uid}/bill`;
    this.db.list(path).update(key, {name: newName, limit: newLimit});
    return this.db.list(path, ref => ref.orderByChild('name').equalTo(select) ).valueChanges();
  }

  getCurrentCategory(select: string, uid: string): Observable<any> {
    const path = `users/${uid}/bill`;
    return this.db.list(path, ref => ref.orderByChild('name').equalTo(select) ).valueChanges();
  }
}
