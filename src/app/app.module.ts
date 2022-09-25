import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeftsideComponent } from './leftside/leftside.component';
import { RightsideComponent } from './rightside/rightside.component';
import { SignupComponent } from './signup/signup.component';
import { LogoComponent } from './logo/logo.component';
import { MailsentComponent } from './mailsent/mailsent.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftsideComponent,
    RightsideComponent,
    SignupComponent,
    LogoComponent,
    MailsentComponent
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
