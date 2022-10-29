import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import {LoginServiceService} from './login-service.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

      constructor(private _loginS:LoginServiceService,private _router:Router){

      }

      canActivate():boolean{
        if(this._loginS.loggedIn()){
          return true
        }
        else{
           this._router.navigate(['login'])
           return false
        }
      }
}
