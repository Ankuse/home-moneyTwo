import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'aks-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.styl']
})

export class AddEventComponent implements OnInit {

  categories: any[];

  constructor( private categoriesService: CategoriesService,
               private afAuth: AuthService,
  ) { }

  ngOnInit(): void {
    this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        const uid = val.uid;
        this.categoriesService.getCategories(uid).subscribe((elem) => {
          this.categories = elem;
        });
      }
    });
  }

}
