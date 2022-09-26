import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifed',
  templateUrl: './verifed.component.html',
  styleUrls: ['./verifed.component.scss']
})
export class VerifedComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(["login"]);
  }

}
