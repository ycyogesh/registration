import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      this.email = data['email']
      this.getUserDetails(this.email);
    })
  }
  getUserDetails(email:string){
    this.appService.getUserDetails(email).subscribe((result)=>{
      this.result = result
      this.result = this.result[0].orgName
      return this.result;
    })
  }

}
