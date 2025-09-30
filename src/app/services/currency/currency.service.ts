import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ConvertResponse, Currency } from './currency.data';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private http = inject(HttpClient);

  getListOfCurrency() {
    return this.http
      .get<any>('currencies', { params: { type: 'fiat' } })
      .pipe(map((response: { response: any }) => response.response));
  }

  convertCurrency(from: string, to: string, amount: string): Observable<ConvertResponse> {
    return this.http
      .get<any>('convert', { params: { from, to, amount } })
      .pipe(map((response: { response: any }) => response.response));
  }
}
