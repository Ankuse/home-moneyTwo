import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'aks-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  changeBtn: boolean;

  constructor( private userService: UsersService,
               private authService: AuthService,
               private router: Router,
               private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.message = new Message('', 'danger');

    this.route.queryParams.subscribe( (params: Params) => {
      if (params['nowCanLogIn']) {
        this.showMessage('Теперь вы можете зайти в систему', 'success');
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showMessage(text: string, type: string = 'danger' ) {
    this.message = new Message(text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  onsubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe( (user: IUser) => {
      console.log(user);
      if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            /*this.router.navigate(['']);*/
            this.showMessage('Вы можете войти в систему !', 'success');
          } else {
            this.showMessage('Пароль не верный ! Вход запрещен !');
          }
      } else {
        this.showMessage('Такого пользователя не существует !');
      }
    });
  }

  onMouseMove(event) {
    const moveToSide = event.offsetX;
    const width = event.target.clientWidth;
    width / 2 < moveToSide ? this.changeBtn = true : this.changeBtn = false;
  }
}
