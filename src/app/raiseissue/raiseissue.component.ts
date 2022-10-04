import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Issues {
  issueName: string,
  issueId: string
}
@Component({
  selector: 'app-raiseissue',
  templateUrl: './raiseissue.component.html',
  styleUrls: ['./raiseissue.component.scss']
})
export class RaiseissueComponent implements OnInit {
  issues:Issues[]=[];
  issue : any
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.issues = [
      {issueName: 'Display Fault', issueId: '1'},
      {issueName: 'Battery Fault', issueId: '2'},
      {issueName: 'Keyboard Fault', issueId: '3'},
      {issueName: 'Charger Fault', issueId: '4'},
      {issueName: 'Hang Issues', issueId: '5'},
      {issueName: 'Others', issueId: '6'}

  ];
    this.issue = this.fb.group({
      issueType : [null,[Validators.required]],
      severity : [null,[Validators.required]],
      description : [null,[Validators.required]],
      issue:['',Validators.required]
    })
  }

}
