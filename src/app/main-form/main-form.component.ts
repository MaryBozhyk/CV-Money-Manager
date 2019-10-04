import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Users } from '../users';
import { Rates } from '../rates';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {

  user: Users;
  menu: boolean = true;
  balance: boolean = false;
  totVal: number;
  card: number;
  cash: number;
  rates: any;
  currencyId: number;
  information: boolean = false;
  detailInf: boolean = false;

  constructor(
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.mainService.listUsers.find(x => x.login === id);
  }

  getBalance(): void {
    this.balance = true;
    this.menu = false;
  }

  calculation(): void {
    this.totVal = 0;
    this.user.income.forEach(x => {
      this.mainService.getData()
      .subscribe((y: Rates) => {
       const itemCurrency = x.currency.toUpperCase();
       this.totVal += x.value / y.rates[itemCurrency];
      });
    });
    this.user.expenditures.forEach(x => {
      this.mainService.getData()
      .subscribe((y: Rates) => {
       const itemCurrency = x.currency.toUpperCase();
       this.totVal -= x.value / y.rates[itemCurrency];
      });
    });
    this.mainService.getData()
    .subscribe((x: Rates) => {
     this.rates = x.rates[this.currencyId];
     this.totVal = Math.round(this.totVal * this.rates);
    });
    this.information = true;
    this.getDetInf()
  }

  getDetInf(){
    this.card = 0;
    this.cash = 0;
    this.user.income.forEach(x => {
      this.mainService.getData()
      .subscribe((y: Rates) => {
       const itemCurrency = x.currency.toUpperCase();
       if(x.card){
       this.card += x.value / y.rates[itemCurrency];
      } else{
        this.cash += x.value / y.rates[itemCurrency];
      }
      });
    });
    this.user.expenditures.forEach(x => {
      this.mainService.getData()
      .subscribe((y: Rates) => {
       const itemCurrency = x.currency.toUpperCase();
       if(x.card){
        this.card -= x.value / y.rates[itemCurrency];
       } else{
         this.cash -= x.value / y.rates[itemCurrency];
       }
      });
    });
    this.mainService.getData()
    .subscribe((x: Rates) => {
     this.rates = x.rates[this.currencyId];
     this.card = Math.round(this.card * this.rates);
     this.cash = Math.round(this.cash * this.rates);
    });
  }

  getDetails(){
    this.detailInf = true;
    this.getDetInf()
  }

  goHome(): void {
    this.balance = false;
    this.menu = true;
    this.detailInf = false;
  }
}
