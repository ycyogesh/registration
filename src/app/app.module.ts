import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { VerifedComponent } from './verifed/verifed.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MailsentComponent,
    VerifedComponent
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
