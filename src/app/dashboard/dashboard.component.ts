import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router, private aRoute : ActivatedRoute) { }

  ngOnInit(): void {
  }

  myAssets(){

  }
  previousIssues(){

  }
  raiseIssue(){
    this.router.navigate(['raise-issue'],{relativeTo : this.aRoute})
  }

}
