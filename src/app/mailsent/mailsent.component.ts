import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mailsent',
  templateUrl: './mailsent.component.html',
  styleUrls: ['./mailsent.component.scss']
})
export class MailsentComponent implements OnInit {
  email : any
  constructor(private aRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe((data)=>{
      // console.log(data);
      this.email = data['email']
      // console.log(this.email);
    })
  }

}
