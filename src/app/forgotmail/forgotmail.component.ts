import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgotmail',
  templateUrl: './forgotmail.component.html',
  styleUrls: ['./forgotmail.component.scss']
})
export class ForgotmailComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login']);
  }

}
