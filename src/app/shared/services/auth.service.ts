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

  public loginWithEmailAndPassword(email: string,
                                   password: string): Promise<any>  {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    });
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  private setUserData(email: string,
                      name: string,
                      password?: string ): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      name: name,
      password: password,
    };
    this.db.object(path).update(data);
  }

  public createUserByEmailAndPassword(email: string,
                                      password: string,
                                      name: string): Promise<any> {
    const convEmail = email.toLowerCase();
    return this.afAuth.auth.createUserWithEmailAndPassword(convEmail, password).then((user) => {
      this.authState = user;
      this.setUserData(convEmail, name, password );
      this.logOut();
    });
  }

  public loginWithGoggle(): void {
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

  public logOut(): void {
    this.afAuth.auth.signOut();
  }

}
