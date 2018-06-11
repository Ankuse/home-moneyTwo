import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'aks-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.styl']
})
export class AddCategoryComponent implements OnInit {

  form_add_category: FormGroup;

  constructor( private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.form_add_category = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      limit: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onsubmit(form: NgForm) {
    const { name, limit } = form.value;

    this.categoriesService.addCategories({name, limit});
  }

}
