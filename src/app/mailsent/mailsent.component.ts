import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'express-validator';
import { AppService } from '../app.service';

@Component({
  selector: 'app-mailsent',
  templateUrl: './mailsent.component.html',
  styleUrls: ['./mailsent.component.scss']
})
export class MailsentComponent implements OnInit {
  email : any
  result: any;
  constructor(private aRoute : ActivatedRoute, private appService : AppService) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe((data)=>{
      // console.log(data);
      this.email = data['email']
      // console.log(this.email);
      this.getUserDetails(this.email);
    })
  }
  getUserDetails(email:string){
    this.appService.getUserDetails(email).subscribe((result)=>{
      console.log("=========>",result);
      
      this.result = result
      return result;
    })
  }

}
