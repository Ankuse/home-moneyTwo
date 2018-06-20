import { Injectable } from '@angular/core';
import {Message} from '../models/message.model';

@Injectable()
export class CommonFunctionService {

  message: Message;

  constructor() { }

  public showMessage(text: string, type: string = 'danger', time: number = 5000) {
    this.message = new Message(text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, time);
    return this.message;
  }
}
