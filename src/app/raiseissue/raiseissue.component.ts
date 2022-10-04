import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Issues {
  issueName: string,
  issueId: any
}
@Component({
  selector: 'app-raiseissue',
  templateUrl: './raiseissue.component.html',
  styleUrls: ['./raiseissue.component.scss']
})
export class RaiseissueComponent implements OnInit {
  issues: Issues[] = [];
  issue: any
  issueId: any
  issueData:any
  severity:any
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.issues = [
      { issueName: 'Display Fault', issueId: 1 },
      { issueName: 'Battery Fault', issueId: 2 },
      { issueName: 'Keyboard Fault', issueId: 3 },
      { issueName: 'Charger Fault', issueId: 4 },
      { issueName: 'Hang Issues', issueId: 5 },
      { issueName: 'Others', issueId: 6 }

    ];

    this.severity = [
      {id : 1, level : 'low'},
      {id : 2, level : 'medium'},
      {id : 3, level : 'high'},
    ]

    this.issue = this.fb.group({
      issueId: ['Select', [Validators.required]],
      severity: ['Select', [Validators.required]],
      description: ['Type Description', [Validators.required]],
    })
    // console.log(this.issue.value);
    const issueData = this.issue.value.issueId;

  }
  get forms() {
    return this.issue.controls

  }

addIssue(){
  let issueData = this.issue.value.issueId;
  let severity = this.issue.value.severity
  let desc = this.issue.value.description
  console.log(this.issue,issueData,severity,desc);
}

issueClick(value : any){
  console.log("Value = ", value);
  // console.log(this.issues[0].issueId);
}

}
