import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BillService} from '../../shared/services/bill.service';
import {Message} from '../../../shared/models/message.model';
import {CommonFunctionService} from '../../../shared/Methods/common-function.service';

@Component({
  selector: 'aks-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.styl']
})

export class AddEventComponent implements OnInit, OnDestroy {

  categories: any[];
  message: Message;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  form_add_event: FormGroup;
  uid: string;
  setValueBill: any;
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor( private categoriesService: CategoriesService,
               private afAuth: AuthService,
               private billService: BillService,
               private commonFunctionService: CommonFunctionService
  ) { }

  ngOnInit(): void {

    this.message = this.commonFunctionService.showMessage('', '');

    this.form_add_event = new FormGroup({
      select: new FormControl(null, [Validators.required]),
      radiogroup: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });

    this.sub1 = this.afAuth.isAuthGoogle$.subscribe( (val) => {
      if ( val !== null && val !== undefined ) {
        this.uid = val.uid;
        this.sub2 = this.categoriesService.getCategories(this.uid).subscribe((elem) => {
          this.categories = elem;
        },
        (error) => {
          console.log(error);
        }
        );
      }
    });
  }

  public onSubmit(form: NgForm): void {
    const formObject = form.control.value;
    console.log(formObject);

    // запрос к bill/value - formObject.amount
    this.sub3 = this.billService.getBill(this.uid).take(1).subscribe((val) => {
      if ( val !== null && val !== undefined ) {
        if (formObject.radiogroup === 'outcome') {
          debugger;
          if (formObject.amount > val.value) {
            this.message = this.commonFunctionService.showMessage('Введенное значение меньше вашего счета !');
          } else {
            this.setValueBill = val.value - formObject.amount;
          }
        } else {
          this.setValueBill = val.value + formObject.amount;
        }
        this.billService.updateBill(this.uid, this.setValueBill);
      } else {
        this.message = this.commonFunctionService.showMessage('Сначала задайте счет !');
      }
    });

  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    } else if (this.sub2) {
      this.sub2.unsubscribe();
    } else if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

}
