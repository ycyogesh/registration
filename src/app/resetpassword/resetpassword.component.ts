import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private router : Router, private appService : AppService, private aRoute : ActivatedRoute) { }
  password : string = ""
  token : any
  data : any
  ngOnInit(): void {
    this.aRoute.params.subscribe((result)=>{
      this.token = result['token']
      console.log("tokennnnnnnn",this.token);
    })
  }

  confirmPassword(){
    this.appService.resetPassword({password :this.password, token : this.token}).subscribe((data)=>{
      this.data = data
      this.data = this.data['status']
      if(this.data){
        this.router.navigate(['login']);
      }
    })
  }
  
  login(){
    this.router.navigate(['login']);
  }

}
