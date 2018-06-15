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

  setUserData(email, name, password? ) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      name: name,
      password: password,
    };
    this.db.object(path).update(data);
  }

  /* Метод не закончен, не удалось придумать как удалять существующие аналогичные имейлы*/
  getExistEmail(uid: string, email: string, convEmail: string, name: string, password: string): Observable<any> {
    const path = `users`;
    this.db.list(path).update(uid, {email: convEmail, name: name, password: password});
    return this.db.list(path, ref => ref.orderByChild('email').equalTo(email)).valueChanges();
  }

  createUserByEmailAndPassword(email, password, name) {
    const convEmail = email.toLowerCase();
    return this.afAuth.auth.createUserWithEmailAndPassword(convEmail, password).then((user) => {
      this.authState = user;
      this.setUserData(convEmail, name, password );
      this.logOut();
      this.getExistEmail(user.uid, user.email, convEmail, name, password).subscribe( (val) => {
        debugger;
        console.log(val);
      });
    });
  }

  loginWithGoggle() {
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()).then( (user) => {
      this.authState = user.user;
      const data = {
        email: this.authState.email,
        name: this.authState.displayName,
        password: '',
      };
      this.setUserData(data.email, data.name, data.password );
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}
