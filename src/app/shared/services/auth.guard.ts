import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

// TODO: AuthGuard не завершен ! Пока работаем на подписке this.isAuthGoogle$
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  public isAuthGoogle$: Observable<firebase.User>;

  constructor( private authService: AuthService,
               private router: Router,
               private afAuth: AngularFireAuth,
  ) {
    this.isAuthGoogle$ = authService.isAuthGoogle$;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.afAuth.authState) {
      return true;
    } else  {
      console.log('access denied');
      this.router.navigate(['login']);
      return false;
    }
  }
  canActivateChild() {
    if (this.afAuth.authState) {
      return true;
    } else  {
      console.log('access denied');
      this.router.navigate(['login']);
      return false;
    }
  }
}
