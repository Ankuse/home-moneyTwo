import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'aks-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.styl']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  form_edit_category: FormGroup;
  items: Observable<any>;
  currentCategory: any;
  uid: string;

  sub1: Subscription;
  sub2: Subscription;

  constructor( private afAuth: AuthService,
               private categoriesService: CategoriesService,
  ) {
    this.sub1 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.uid = val.uid;
        this.categoriesService.getCategiriesList(val.uid).subscribe((categories) => {
          this.items = categories;
        });
      }
    });
  }

  ngOnInit(): void {
    this.form_edit_category = new FormGroup({
      select:  new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      limit: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  public onsubmit( form: NgForm): void {
    this.sub2 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        const { name, limit } = form.value;
        const select = form.value.select.name;
        const key = form.value.select.key;
        this.categoriesService.updateCategories(val.uid, select, key, name, limit);
      }
    });
  }

  public onCategoryChange(form: NgForm): void {
    const select = form.value.select.name;
    this.categoriesService.getCurrentCategory(select, this.uid).subscribe((curCategory) => {
      curCategory.map( (category) => {
        this.currentCategory = category;
        this.form_edit_category.controls['name'].setValue(this.currentCategory.name);
        this.form_edit_category.controls['limit'].setValue(this.currentCategory.limit);
      });
    } );
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    } else if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
