import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let stocks: Array<string> = ['AAPL', 'GOOG', 'META', 'AMZN', 'TWTR'];
let service: string = 'https://angular2-in-action-api.herokuapp.com'; 

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  get() {
    return stocks.slice();
  }

  add(stock: any) {
    stocks.push(stock);
    return this.get();
  } 

  remove(stock: any) {
    stocks.splice(stocks.indexOf(stock, 1));
  }
   
  load(symbols: any) {
    if (symbols) {
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symbols=' + symbols.join());
    }
    return this.http.get<Array<StockInterface>>(service + '/stocks');
  }
}
