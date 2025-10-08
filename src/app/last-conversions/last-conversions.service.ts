import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

interface ListItem {
  from: string;
  to: string;
  fromCurrency: string;
  fromCurrencyName?: string;
  toCurrency: string;
  toCurrencyName?: string;
  exchangeRate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LastConversionsService {
  private listSize = environment.listSize;

  list: WritableSignal<ListItem[]> = signal<ListItem[]>([]);

  add = (item: ListItem) => {
    this.list.update((list) => {
      list.unshift(item);

      if (list.length - 1 > this.listSize) {
        list.pop();
      }

      return list;
    });
    console.log(this.list());
  };
}
