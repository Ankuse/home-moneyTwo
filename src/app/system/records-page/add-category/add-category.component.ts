import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {CommonFunctionService} from '../../../shared/Methods/common-function.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'aks-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.styl']
})
export class AddCategoryComponent implements OnInit {

  @Input() clientUid: string;
  form_add_category: FormGroup;
  message: Message;

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
    this.categoriesService.addCategories(this.clientUid, {name, limit});
    form.form.reset();
    this.message = this.commonFunctionService.showMessage(`Категория "${name}" добавлена !`, 'success');
  }
}
