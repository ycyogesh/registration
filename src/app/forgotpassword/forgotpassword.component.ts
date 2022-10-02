import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private appService: AppService) { }

  email: string = "";
  data: any

  ngOnInit(): void {
  }

  requestLink() {
    console.log('Requested', this.email);
    this.appService.forgotUser(this.email).subscribe((data) => {
      this.data = data
      this.data = this.data['status']
      if(this.data){
        this.router.navigate(['forgot-user']);
      }
    })

  }

  login() {
    this.router.navigate(['login']);
  }

}
