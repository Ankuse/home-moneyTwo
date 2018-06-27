import {
  Component,
  EventEmitter,
  OnChanges,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../../shared/models/message.model';
import {CommonFunctionService} from '../../../shared/Methods/common-function.service';

@Component({
  selector: 'aks-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.styl']
})
export class EditCategoryComponent implements OnInit, OnDestroy, OnChanges {

  @Output() categories: EventEmitter<any> = new EventEmitter();
  @Input('clientUid') clientUid: string;

  form_edit_category: FormGroup;
  message: Message;
  categories$: Observable<any>;
  currentCategory: any;
  keyCategory = 0;

  sub1: Subscription;
  sub2: Subscription;

  constructor( private afAuth: AuthService,
               private categoriesService: CategoriesService,
               private commonFunctions: CommonFunctionService
  ) { }

  ngOnInit(): void {
    this.message = this.commonFunctions.showMessage('', 'success');

    this.form_edit_category = new FormGroup({
      select:  new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      limit: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  ngOnChanges(): void {
    this.sub1 = this.categoriesService.getCategiriesList(this.clientUid).subscribe((categories) => {
      this.categories$ = categories;
      this.categories.emit(this.categories$);

      if (categories.length > 1) {
        this.form_edit_category.controls['select'].setValue(categories[0]);
        this.form_edit_category.controls['name'].setValue(categories[0].name);
        this.form_edit_category.controls['limit'].setValue(categories[0].limit);
      } else {
        console.log('Категорий нет ! Добавьте категории ! ');
      }
    },
    (error) => {
      console.log(error);
    });
  }

  public onsubmit( form: NgForm): void {
    const { name } = form.value;
    const limit = form.value.limit;
    const select = form.value.select.name;
    const key = form.value.select.key;
    this.categoriesService.updateCategories(this.clientUid, select, key, name, limit);
    this.message = this.commonFunctions.showMessage(`Категория "${select}" успешно изменена`, 'success');
  }

  public onCategoryChange(form: NgForm): void {
    console.log(this.keyCategory);
    const select = form.value.select.name;
    this.sub2 = this.categoriesService.getCurrentCategory(select, this.clientUid).subscribe((curCategory) => {
      curCategory.map( (category) => {
        this.currentCategory = category;
        this.form_edit_category.controls['name'].setValue(this.currentCategory.name);
        this.form_edit_category.controls['limit'].setValue(this.currentCategory.limit);
      });
    },
    (error) => {
      console.log(error);
    }
    );
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    } else if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
