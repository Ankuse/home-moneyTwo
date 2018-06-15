import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {CommonFunctionService} from '../../shared/Methods/common-function.service';

@Component({
  selector: 'aks-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  changeBtn: boolean;
  isAuthGoogle$ = this.authService.isAuthGoogle$;

  constructor( private authService: AuthService,
               private router: Router,
               private commonFunctions: CommonFunctionService
  ) {}

  ngOnInit() {

    this.message = this.commonFunctions.showMessage('', 'danger');

    this.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.router.navigate(['/system', 'bill']);
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  public onsubmit() {
    const formData = this.form.value;
    this.authService.loginWithEmailAndPassword(formData.email, formData.password).catch((error) => {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        this.message = this.commonFunctions.showMessage('Такого юзера не существует !');
      } else if (error.code === 'auth/wrong-password') {
        this.message = this.commonFunctions.showMessage('Пароль введен не верно !');
      } else if (error.code === 'auth/invalid-email') {
        this.message = this.commonFunctions.showMessage('Введен некорректный Email !');
      } else if (error.code === 'auth/user-disabled') {
        this.message = this.commonFunctions.showMessage('Пользователь с таким Email был отключен ! Простите !');
      }
    });
  }

  public loginGoogle() {
    this.authService.loginWithGoggle();
  }

  public logout() {
    this.authService.logOut();
  }

}
