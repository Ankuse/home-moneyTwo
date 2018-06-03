import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';
import {CommonFunctionService} from '../../shared/Methods/common-function.service';
import {Observable} from 'rxjs/Observable';
import {UsersService} from '../../shared/services/users.service';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'aks-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.styl']
})
export class RegistrationComponent implements OnInit {
  message: Message;
  form: FormGroup;

  constructor( private authService: AuthService,
               private commonFunctionService: CommonFunctionService,
               private userService: UsersService
  ) { }

  ngOnInit() {

    this.message = new Message('', 'danger');

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.existingEmail.bind(this)  ),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(null, [Validators.requiredTrue]),
    });
  }

  // TODO: обработать метод с задержкой и переходом
  onsubmit() {
    const formData = this.form.value;

    /* Метод удаления существуеющего имейла в /users  --- Незакончен ---*/
    // this.authService.getExistEmail(formData.email);

    /*On successful creation of the user account, this user will also be signed in to your application.*/
    this.authService.createUserByEmailAndPassword(formData.email, formData.password, formData.name)
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.message = this.commonFunctionService.showMessage('Такой имейл уже используется другим юзером ! ');
        } else if (error.code === 'auth/invalid-email') {
          this.message = this.commonFunctionService.showMessage('Адресы электронной почты не действительный ! ');
        } else if (error.code === 'auth/operation-not-allowed') {
          this.message = this.commonFunctionService.showMessage('Такой способ авторизации еще не осуществлен ! ');
        } else if (error.code === 'auth/weak-password') {
          this.message = this.commonFunctionService.showMessage('Ваш пароль недостаточно безопасный !  ');
        }
        console.log(error);
      });
  }

  existingEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise( (resolve, reject) => {
      this.userService.getUserByEmail(control.value).subscribe( (user: IUser[]) => {
        if (user.length > 0) {
          resolve({
            exist: true
          });
        } else {
          resolve(null);
        }
      });
    } );
  }

}
