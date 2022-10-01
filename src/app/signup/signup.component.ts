import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userSignup: any;
  result: any;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {

    this.userSignup = this.fb.group({
      orgName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      mobileNo: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })

    console.log(this.userSignup);
  }


  get forms() {
    return this.userSignup.controls;
  }

  createAccount() {
    this.appService.createAccount({ orgName: this.forms['orgName'].value, email: this.forms['email'].value, password: this.forms['password'].value, mobileNo: this.forms['mobileNo'].value }).subscribe((result) => {
      console.log("------>", result);
      this.result = result

      if (this.result['status']) {
        console.log("Result Controller", result);
        alert("Check your Mail");
        this.router.navigate(['activate', this.forms['email'].value], this.forms['orgName'].value)
        return;
      }
      this.userSignup.reset();
      alert("Something went wrong!");
      return
    })

  }
}
