import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'aks-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.styl']
})

export class SystemComponent implements OnInit {

  user: string;
  isAuthGoogle$ = this.authService.isAuthGoogle$;

  constructor( private authService: AuthService,
               private router: Router,
               private userService: UsersService
  ) { }

  ngOnInit() {

    this.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        if (val.displayName !== null) {
          this.user = val.displayName;
        } else {
          this.userService.getUserByEmail(val.email.toLowerCase()).subscribe((el) => {
            el.map((user) => {
              this.user = user.name;
            });
          });
        }
      } else {
        this.router.navigate(['/login']);
      }
    });

  }

}
