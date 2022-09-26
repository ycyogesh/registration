import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailsentComponent } from './mailsent/mailsent.component';
import { SignupComponent } from './signup/signup.component';
import { VerifedComponent } from './verifed/verifed.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "signup",
    pathMatch: "full"
  },
  {
    path : "signup",
    component : SignupComponent
  },
  {
    path: "activate",
    component: MailsentComponent
  },
  {
    path : "verified",
    component : VerifedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
