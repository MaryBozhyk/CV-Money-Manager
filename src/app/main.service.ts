import { Injectable } from '@angular/core';
import { Users } from './users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rates } from './rates';
import { Currency } from './currrency'

@Injectable({
  providedIn: 'root'
})

export class MainService {

  private exchangeUrl = 'http://data.fixer.io/api/latest?access_key=33f04853b75ec8b764ab9ff9a599af88';

  listUsers: Array<Users>=[
    {login: 'admin',
    email: 'm_bozhyk@ukr.net',
    password: 'admin1',
    income: [],
    expenditures: []},
    {login: 'user',
    email: 'marybozhyk@gmail.com',
    password: 'user01',
    income: [],
    expenditures: []}
  ];

  currencies: Array<Currency> = [
    {id: 1, value: 'UAH'},
    {id: 2, value: 'EUR'},
    {id: 3, value: 'USD'},
    {id: 4, value: 'PLN'},
  ]

  constructor( private http: HttpClient) { }

  getData() {
    return this.http.get<Rates>(this.exchangeUrl)
  }
}
