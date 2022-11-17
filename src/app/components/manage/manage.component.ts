import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  symbols: Array<string> = [];
  stock: string = "";
  service: StocksService;

  constructor(service: StocksService) { 
    this.service = service;
    this.symbols = this.service.get(); 
  }

  ngOnInit(): void {
  }

  add() {
    if(this.stock.trim() != "") {
      this.symbols = this.service.add(this.stock.toUpperCase());
    }
    this.stock = '';
  }

  remove(symbol: string): void {
    this.service.remove(symbol);
    this.symbols = this.service.get()
  }
   
}
