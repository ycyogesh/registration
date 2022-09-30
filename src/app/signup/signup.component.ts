import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userSignup : any;

  constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.userSignup = this.fb.group({
      orgName : [null,[Validators.required]],
      email : [null,[Validators.required]],
      password : [null,[Validators.required, Validators.minLength(8)]],
      mobileNo : [null,[Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })

  }


  get forms(){
    return this.userSignup.controls;
  }

  createAccount(){
    this.router.navigate(['activate'])
  }
}
