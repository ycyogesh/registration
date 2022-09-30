import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient : HttpClient) { }

  createAccount(details:{}){
    console.log("Controller",details);    
    return this.httpClient.post(environment.appUrl+"signUp",details)
  }

  getUserDetails(email : string){
    return this.httpClient.get(environment.appUrl+"getUserDetails?email="+email)
  }

}
