import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailsentComponent } from './mailsent/mailsent.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path : "",
    redirectTo : "signup",
    pathMatch : "full"
  },
  {
    path : "signup",
    component : SignupComponent,
    children : [
      {
        path : "activate",
        component : MailsentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
