import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  confirmPassword(){

  }
  
  login(){
    this.router.navigate(['login']);
  }

}
