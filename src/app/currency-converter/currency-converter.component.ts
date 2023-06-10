import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  firstCurrencyAmount: number;
  firstCurrency: string;
  firstselectedValue;
  firstInput: number = null

  secondCurrencyAmount: number;
  secondCurrency: string;
  secondselectedValue: string
  secondInput: number = null

  calc: string;

  allCurrencyList

  constructor(private curServe: CurrencyService) {
  }

  ngOnInit() {
    this.curServe.fetchAllCurrencies().subscribe(res => {
      this.allCurrencyList = res;
      this.allCurrencyList = [new Currency(111,'Гривня', 1, "UAH", '09.06.2023'), ...this.allCurrencyList]
    })
  }

  updateCurrencies() {
    if (this.firstselectedValue) {
      const arr = this.firstselectedValue.split(' ')
      this.firstCurrency = arr[0]
      this.firstCurrencyAmount = this.allCurrencyList.find(i=> i.cc === arr[0]).rate
    }

    if (this.secondselectedValue) {
      const arr = this.secondselectedValue.split(' ')
      this.secondCurrency = arr[0]
      this.secondCurrencyAmount = this.allCurrencyList.find(i=> i.cc === arr[0]).rate;
    }

    if (this.firstselectedValue && this.secondselectedValue) {
      this.calc = (this.firstCurrencyAmount/this.secondCurrencyAmount).toFixed(2)
      if(this.firstInput) {
        this.secondInput = +(+this.firstInput * +this.calc).toFixed(2)
      }
    }
  }

  onfirstInput(event) {
    this.firstInput = event.target.value;
    this.secondInput = +(+this.firstInput * +this.calc).toFixed(2)

    if (!this.firstselectedValue  || !this.secondselectedValue || isNaN(+this.firstInput)) {
      this.secondInput = null
    }
  }

  onSecondInput(event) {
    this.secondInput = event.target.value;
    this.firstInput = +(+this.secondInput / +this.calc).toFixed(2)

    if (!this.firstselectedValue  || !this.secondselectedValue || isNaN(+this.secondInput)) {
      this.firstInput = null
    }
  }
}
