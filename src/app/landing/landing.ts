import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CurrencyService } from '../services/currency/currency.service';
import { ConvertResponse, Currency } from '../services/currency/currency.data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LastConversions } from '../last-conversions/last-conversions';
import { LastConversionsService } from '../last-conversions/last-conversions.service';

@Component({
  selector: 'app-landing',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LastConversions,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  formGroup = new FormGroup({
    fromCurrency: new FormControl('', Validators.required),
    fromAmount: new FormControl(''),
    toCurrency: new FormControl('', Validators.required),
    toAmount: new FormControl(''),
  });

  // currenciesList: WritableSignal<Currency[]> = signal(CURRENCIES.response);
  currenciesList: WritableSignal<Currency[]> = signal([]);
  loading = signal(false);

  private currencyService = inject(CurrencyService);
  private snackBar = inject(MatSnackBar);
  private lastConversionsService = inject(LastConversionsService);

  ngOnInit() {
    this.getListOfCurrencies();
  }

  getListOfCurrencies() {
    this.currencyService.getListOfCurrency().subscribe({
      next: (data) => {
        this.currenciesList.set(data);
      },
      error: () => {
        this.openSnackBar('Cannot get list of currencies. Refresh the page.');
      },
    });
  }

  convert() {
    if (this.formGroup.valid && !this.loading()) {
      const form = this.formGroup.value;
      if (!form.fromAmount) {
        this.openSnackBar('Nothing to convert');
        return;
      }

      if (form.fromCurrency === form.toCurrency) {
        this.openSnackBar('Same currency. Please choose different.');
        return;
      }

      this.loading.set(true);
      this.currencyService
        .convertCurrency(form.fromCurrency!, form.toCurrency!, form.fromAmount)
        .subscribe({
          next: (data: ConvertResponse) => {
            console.log(data);
            this.loading.set(false);
            this.formGroup.controls['toAmount'].setValue(
              (Math.round(data.value * 100) / 100).toString(),
            );
            this.lastConversionsService.add({
              toCurrency: data.to,
              fromCurrency: data.from,
              from: form.fromAmount as string,
              to: data.value.toString(),
            });
          },
          error: () => {
            this.loading.set(false);
            this.openSnackBar('Error! Cannot convert.');
          },
        });
    }
  }

  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'error',
    });
  }
}
