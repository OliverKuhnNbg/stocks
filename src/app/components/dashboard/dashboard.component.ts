import { Component, OnInit } from '@angular/core';
import { StocksService, StockInterface } from '../../services/stocks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: Array<StockInterface>;
  symbols: Array<string>;

  constructor(private service: StocksService) {
    this.stocks = [];
    this.symbols = service.get();
   }

  ngOnInit(): void {
    this.loadAllStocksfromService();
  }

  loadAllStocksfromService(): void {
    for (let i = 0; i < this.symbols.length; i++ ) {
      // here request object will be loaded via the current 'symbol' (z.B. "META")
      // than the single stock(-request-obj) will be added to the list
      // ---- after every add to the list the list will be immediately ordered alphabetically by 'stock-request-obj.symbol'
      //  ---- ordering and adding happens in angular observable.subscripe()
      this.service.load([this.symbols[i]]).subscribe(stock => {
        this.stocks.push(stock[0]);
        this.stocks.sort((a,b) => a.symbol > b.symbol ? 1 : -1);
      });
    }
  }

}
