import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Users } from '../users';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent implements OnInit {

  user: Users;
  income: boolean = false;
  menu: boolean = true;
  showMainForm: boolean = true;
  down: boolean = true;

  incomeForm = this.fb.group({
    date: ['', Validators.required],
    value: ['', Validators.required],
    currency: ['', Validators.required],
    source: ['', Validators.required],
    card: ['', Validators]
  });

  constructor(private fb: FormBuilder,
    private router: ActivatedRoute, 
    public mainService: MainService) { }

  ngOnInit(): void{
    this.getItem();
  }

  getItem(): void{
    let id = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.mainService.listUsers.find(x => x.login == id);
  }

  onChange(param: any){
    if(this.down){
    this.user.income.sort((a,b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0))
  } else {
    this.user.income.sort((a,b) => (b[param] > a[param]) ? 1 : ((a[param] > b[param]) ? -1 : 0))
  }
  }

    addIncome(): void {
    this.income = true;
    this.menu = false;
  }

  addNewIncome(): void {
    this.user.income.push(this.incomeForm.value);
    this.incomeForm.reset();
  }

  goHome(): void {
    this.income = false;
    this.menu = true;
  }

}
