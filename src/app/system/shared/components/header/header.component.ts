import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'aks-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  @Input() user: string;
  date: Date = new Date();

  constructor(
      private authService: AuthService,
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  public logout(): void {
    this.authService.logOut();
  }

}
