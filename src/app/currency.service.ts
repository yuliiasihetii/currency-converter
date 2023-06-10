import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { API_CURRENCY } from "./config";
import { map } from "rxjs/operators";
import { Currency } from "./currency.model";

@Injectable()

export class CurrencyService {
    constructor(private http: HttpClient) {
    }

    fetchAllCurrencies() {
      return  this.http.get(API_CURRENCY)
    }

    fetchCurrencies () {
       return this.http.get(API_CURRENCY)
        .pipe(map(
            (res) => {
                const newArr = []
                for(let i in res) {
                    if( res[i].cc == 'EUR' || res[i].cc == 'USD') newArr.push(res[i])
                }
                return newArr
            }
        ))
    }
}