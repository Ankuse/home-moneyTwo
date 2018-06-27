import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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

export class AddEventComponent implements OnInit, OnDestroy, OnChanges {

  message: Message;
  form_add_event: FormGroup;

  @Input() clientUid: string;
  categories: any[];
  setValueBill: any;
  keyCategory = 0;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

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

  }

  public onSubmit(form: NgForm): void {
    const formObject = form.control.value;
    console.log(formObject);

    // запрос к bill/value - formObject.amount
    this.sub3 = this.billService.getBill(this.clientUid).take(1).subscribe((val) => {
      if ( val !== null && val !== undefined ) {
        if (formObject.radiogroup === 'outcome') {
          if (formObject.amount > val.value) {
            this.message = this.commonFunctionService.showMessage('Введенное значение меньше вашего счета !');
          } else {
            this.setValueBill = val.value - formObject.amount;
            this.message = this.commonFunctionService.showMessage('Данные по расходу успешно записаны в базу !', 'success');
          }
        } else {
          this.setValueBill = val.value + formObject.amount;
          this.message = this.commonFunctionService.showMessage('Данные по доходу успешно записаны в базу !', 'success');
        }
        this.billService.updateBill(this.clientUid, this.setValueBill);
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

  ngOnChanges(changes: SimpleChanges): void {
    this.sub2 = this.categoriesService.getCategories(this.clientUid).subscribe((elem) => {
          this.categories = elem;
        },
        (error) => {
          console.log(error);
        }
    );
  }

}
