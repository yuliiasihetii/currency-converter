import { Component, OnInit, Output } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  curenciesList : Currency[] = []
  
  constructor(private curServ: CurrencyService) {
  }

  ngOnInit(): void {
    this.curServ.fetchCurrencies().subscribe(res => this.curenciesList= res)
  }
}
