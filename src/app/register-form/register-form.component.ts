import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../main.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm = this.fb.group({
    login: ['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, public mainService: MainService) { }

  ngOnInit() {
  }

  submitReg(){
    if(this.mainService.listUsers.find(x => x.login === this.registerForm.value.login)){
      alert('This login is already registered')
    } else if (this.mainService.listUsers.find(x => x.email === this.registerForm.value.email)){
      alert('This email is already registered')
    } else{
      this.mainService.listUsers.push(this.registerForm.value)
    }
    this.registerForm.reset();
  }

}
