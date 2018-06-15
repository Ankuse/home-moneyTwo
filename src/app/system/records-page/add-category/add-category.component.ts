import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'aks-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.styl']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  form_add_category: FormGroup;
  sub1: Subscription;

  constructor( private categoriesService: CategoriesService,
               private afAuth: AuthService
  ) { }

  ngOnInit() {
    this.form_add_category = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      limit: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onsubmit(form: NgForm) {
    const { name, limit } = form.value;
    this.sub1 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.categoriesService.addCategories(val.uid, {name, limit});
        form.form.reset();
      }
    });
  }

  ngOnDestroy(): void {
     if (this.sub1) {
       this.sub1.unsubscribe();
     }
  }
}
