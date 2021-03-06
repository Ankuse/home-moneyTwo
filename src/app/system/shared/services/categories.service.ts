import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoriesService {

  items$: Observable<any[]>;

  constructor( private db: AngularFireDatabase,
  ) { }

  public getCategiriesList(uid): Observable<any> {
    return this.items$ = this.db.list(`users/${uid}/categories`).snapshotChanges().pipe(
        map( (changes) => (
            changes.map( (c) =>
                (
                    { key: c.payload.key, ...c.payload.val() }
                )
            )
        ))
    );
  }

  public addCategories(uid: string,
                       category: object): void {
    const path = `users/${uid}/categories`;
    this.db.list(path).push(category);
  }

  public deleteCategories(uid: string, key: string): void {
    const path = `users/${uid}/categories`;
    this.db.list(path).remove(key);
  }

  public getCategories(uid): Observable<any> {
    const path = `users/${uid}/categories`;
    return this.db.list(path).valueChanges();
  }

  public updateCategories(  uid: string,
                            select: string,
                            key: string,
                            newName: string,
                            newLimit: number
  ): Observable<any> {
    const path = `users/${uid}/categories`;
    this.db.list(path).update(key, {name: newName, limit: newLimit});
    return this.db.list(path, ref => ref.orderByChild('name').equalTo(select) ).valueChanges();
  }

  public getCurrentCategory(select: string, uid: string): Observable<any> {
    const path = `users/${uid}/categories`;
    return this.db.list(path, ref => ref.orderByChild('name').equalTo(select) ).valueChanges();
  }
}
