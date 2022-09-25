import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.router.navigate(['activate'],{relativeTo : this.route})
  }
}
