import { Url } from './../model/ulr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService   {

  // private baseUrl = 'http://localhost/LaravelAngularComplet/public/api/';
  url = new Url();
  baseUrl = this.url.url


  constructor(private http:HttpClient) { }

  verification (user: Object){
    return this.http.post(`${this.baseUrl}/`, user);

  }

  loginUser(email:any,password:any) {

    return this.http.post<any>(this.baseUrl+'login',{email, password},{observe:'response'});

  }

  RegisterUser(prenom:any,nom:any,adresse:any,telephone:any,email:any,password:any) {


    return this.http.post<any>(this.baseUrl+'register',{prenom,nom,adresse,telephone,email,password},{ observe: 'response' });
  }

  loggedIn(){
    return localStorage.getItem('token')
  }


}
