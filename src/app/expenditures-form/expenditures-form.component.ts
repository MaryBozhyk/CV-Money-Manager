import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { Users } from '../users';

@Component({
  selector: 'app-expenditures-form',
  templateUrl: './expenditures-form.component.html',
  styleUrls: ['./expenditures-form.component.scss']
})

export class ExpendituresFormComponent implements OnInit {

  user: Users;
  menu: boolean = true;
  expenditure: boolean = false;
  down: boolean = true;

  expenditureForm = this.fb.group({
    date: ['', Validators.required],
    value: ['', Validators.required],
    currency: ['', Validators.required],
    source: ['', Validators.required],
    card: ['', Validators]
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    public mainService: MainService) { }

  ngOnInit(): void{
    this.getItem();
  }

  getItem(): void{
    let id = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.mainService.listUsers.find(x => x.login == id);
  }

  addExpenditure(): void {
    this.expenditure = true;
    this.menu = false;
  }
  
  addNewExpenditure(): void {
    this.user.expenditures.push(this.expenditureForm.value);
    this.expenditureForm.reset();
  }

  goHome(): void {
    this.expenditure = false;
    this.menu = true;
  }

  onChange(param: any){
    if(this.down){
    this.user.expenditures.sort((a,b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0))
  } else {
    this.user.expenditures.sort((a,b) => (b[param] > a[param]) ? 1 : ((a[param] > b[param]) ? -1 : 0))
  }
  }

}
