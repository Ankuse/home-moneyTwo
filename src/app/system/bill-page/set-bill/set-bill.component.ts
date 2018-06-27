import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'aks-set-bill',
  templateUrl: './set-bill.component.html',
  styleUrls: ['./set-bill.component.styl']
})
export class SetBillComponent implements OnInit, OnDestroy {

  bill = 1;
  form: FormGroup;
  sub1: Subscription;
  sub2: Subscription;
  uid: string;
  message: Message;

  constructor( private authSevice: AuthService,
               private billService: BillService,
  ) { }

  ngOnInit(): void {

    this.message = {
      text: `Ваше счет равен "Загрузка"`,
      type: 'success',
    };

    this.form = new FormGroup({
      bill: new FormControl()
    });

    this.sub1 = this.authSevice.isAuthGoogle$.subscribe((val) => {
      this.uid = val.uid;
      this.sub2 = this.billService.getBill(this.uid).subscribe((bill) => {
        this.bill = bill.value;
        this.message = {
          text: `Ваш счет равен ${this.bill}`,
          type: 'success',
        };
      });
    });
  }

  public onSubmit(): void {
    this.billService.setBill(this.uid, this.bill);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    } else {
      this.sub2.unsubscribe();
    }
  }

}
