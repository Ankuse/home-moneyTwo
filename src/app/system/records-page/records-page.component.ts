import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'aks-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.styl']
})
export class RecordsPageComponent implements OnInit, OnDestroy {

  categories: any;
  clientUid: string;
  sub1: Subscription;

  constructor(private afAuth: AuthService,
  ) { }

  ngOnInit() {
    this.sub1 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.clientUid = val.uid;
      }
    });
  }

  onCategories(event) {
    this.categories = event;
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
