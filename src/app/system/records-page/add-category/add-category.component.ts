import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {CommonFunctionService} from '../../../shared/Methods/common-function.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'aks-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.styl']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  form_add_category: FormGroup;
  message: Message;
  sub1: Subscription;

  constructor( private categoriesService: CategoriesService,
               private afAuth: AuthService,
               private commonFunctionService: CommonFunctionService
  ) { }

  ngOnInit(): void {

    this.message = this.commonFunctionService.showMessage('', 'success');

    this.form_add_category = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      limit: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  public onSubmit(form: NgForm): void {
    const { name, limit } = form.value;
    this.sub1 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.categoriesService.addCategories(val.uid, {name, limit});
        form.form.reset();
        this.message = this.commonFunctionService.showMessage(`Категория "${name}" добавлена !`, 'success');
      }
    });
  }

  ngOnDestroy(): void {
     if (this.sub1) {
       this.sub1.unsubscribe();
     }
  }
}
