import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
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
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "forgot-password",
    component : ForgotpasswordComponent
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
