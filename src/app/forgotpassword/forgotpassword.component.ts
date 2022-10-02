import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router : Router, private appService :AppService) { }

  email : string = "";

  ngOnInit(): void {
  }

  requestLink(){
    console.log('Requested',this.email);
    this.appService.forgotUser(this.email).subscribe((data)=>{
      console.log("Received",data);
      
    })
    
  }

  login(){
    this.router.navigate(['login']);
  }

}
