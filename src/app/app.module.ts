import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { VerifedComponent } from './verifed/verifed.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotmailComponent } from './forgotmail/forgotmail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MailsentComponent,
    VerifedComponent,
    PagenotfoundComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ForgotmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
