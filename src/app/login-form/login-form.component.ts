import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder, public mainService: MainService, private router:Router) { }

  ngOnInit() {
  }

  submit(){
    if(this.mainService.listUsers.find(x => x.login === this.loginForm.value.login) && this.mainService.listUsers.find(x => x.password === this.loginForm.value.password)){
      let id = this.loginForm.value.login;
      localStorage.setItem('currentUser', JSON.stringify(id)) 
      this.router.navigateByUrl('/main')
    } else{
      alert('The login or the password is not correct')
    }
    this.loginForm.reset();
  }

}
