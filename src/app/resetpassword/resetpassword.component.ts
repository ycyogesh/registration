import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private router : Router, private appService : AppService) { }
  password : string = ""
  ngOnInit(): void {
  }

  confirmPassword(){
    this.appService.resetPassword({password :this.password}).subscribe(()=>{

    })
  }
  
  login(){
    this.router.navigate(['login']);
  }

}
