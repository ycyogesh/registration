import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-verifed',
  templateUrl: './verifed.component.html',
  styleUrls: ['./verifed.component.scss']
})
export class VerifedComponent implements OnInit {

  result: any
  tokenResult: any
  isVerified : boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private appServeice: AppService) { }

  ngOnInit(): void {
    this.route.params.subscribe((result) => {
      this.result = result
      this.result = this.result['token']
      this.getUserDetails(this.result);
    })
  }

  getUserDetails(token: string) {
    this.appServeice.verfiyUser(token).subscribe((tokenResult) => {
      this.tokenResult = tokenResult
      this.tokenResult = this.tokenResult.changedRows
      console.log("tokenResult", this.tokenResult);

      if (this.tokenResult == 1) {
        this.isVerified = true;
        alert("Verified Successfully")
        return;
       }
    })
  }

  login() {
    this.router.navigate(["login"]);
  }

}
