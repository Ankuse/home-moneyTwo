import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {IUser} from '../../shared/models/user.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'aks-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.styl']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor( private userService: UsersService,
               private afs: AngularFirestore,
               private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.existingEmail.bind(this)  ),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(null, [Validators.requiredTrue]),
    });
  }

  onsubmit() {
    const { email, password, name, } = this.form.value;
    const id = this.afs.createId();
    this.userService.createNewUser( { email, password, name, id } );
    this.router.navigate(['/login'], {
      queryParams: {
        nowCanLogIn: true,
      }
    });
    console.log(this.form);
  }

  existingEmail(control: FormControl): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.userService.getUserByEmail(control.value).subscribe( (user: IUser) => {
        if (user) {
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
