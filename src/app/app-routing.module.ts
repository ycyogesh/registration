import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verify } from 'jsonwebtoken';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotmailComponent } from './forgotmail/forgotmail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RaiseissueComponent } from './raiseissue/raiseissue.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
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
    component : SignupComponent,
  },
  {
    path: "activate/:email",
    component: MailsentComponent
  },
  {
    path : "activation/:token",
    component : VerifedComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "dashboard",
    component : DashboardComponent,
    children : [
      {
        path : "raise-issue",
        component : RaiseissueComponent
      },
      {
        path : "previous-issue",
        component : RaiseissueComponent
      },
      {
        path : "my-assets",
        component : RaiseissueComponent
      }
    ],
    canActivate:[AuthGuard]
  },
  {
    path : "forgot-password",
    component : ForgotpasswordComponent
  },
  {
    path : "forgot-mail",
    component : ForgotmailComponent
  },
  {
    path : "reset-password",
    component : ResetpasswordComponent
  },
  {
    path : "**",
    component : PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
