import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userSignup : any
  constructor(private router : Router, private fb : FormBuilder, private appService : AppService) { }

  ngOnInit(): void {
    this.userSignup = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    })
  }
  get forms() {
    return this.userSignup.controls;
  }

  login(){    
    this.appService.login({email : this.forms['email'].value, password : this.forms['password'].value}).subscribe((result)=>{
      console.log("result------>",result);
      alert("Clicked");
      
    })
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

}
