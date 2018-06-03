import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()

export class AuthService {

  public isAuthGoogle$: Observable<firebase.User>;
  private authState: firebase.UserInfo;

  constructor( private afAuth: AngularFireAuth,
               private db: AngularFireDatabase,
  ) {
    this.isAuthGoogle$ = afAuth.authState;
  }

  loginWithEmailAndPassword(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    });
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  setUserData(email, password, name) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      password: password,
      name: name
    };
    this.db.object(path).update(data);
  }

  /* Метод не закончен, не удалось придумать как удалять существующие аналогичные имейлы*/
  getExistEmail(email) {
    /*const geter = this.httpClient.get('https://homemoney-290c1.firebaseio.com/users/1sPkPMJnf7eJMBBIK9ZDwSYVAoX2', {
      headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*'),
      responseType: 'json',
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const urlPtipo = 'https://homemoney-290c1.firebaseio.com/users/1sPkPMJnf7eJMBBIK9ZDwSYVAoX2';
    const geterD = this.httpClient.get(urlPtipo, httpOptions);
    geterD.subscribe(val => { console.log(val); });*/

    const convEmail = email.toLowerCase();
    const exist_email = this.db.list('/users', ref => ref.orderByChild('email').equalTo(convEmail)).valueChanges();
  }

  createUserByEmailAndPassword(email, password, name) {
    const convEmail = email.toLowerCase();
    return this.afAuth.auth.createUserWithEmailAndPassword(convEmail, password).then((user) => {
      this.authState = user;
      this.setUserData(convEmail, password, name);
      this.logOut();
    });
  }

  loginWithGoggle() {
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}
