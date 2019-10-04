import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Users } from '../users';
import { Rates } from '../rates';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user: Users;
  exit: boolean = false;
  showMainForm: boolean = true;
  showIncForm: boolean = false;
  showExpForm: boolean = false;
  euro: any;
  usd: any;
  pln: any;

  constructor(
    public mainService: MainService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.mainService.listUsers.find(x => x.login === id);
    this.mainService.getData()
      .subscribe((y: Rates) => {
       this.euro = Math.round(y.rates['UAH']);
       this.usd = Math.round(y.rates['UAH']/y.rates['USD']);
       this.pln = Math.round(y.rates['UAH']/y.rates['PLN']);
      })
  }
}


