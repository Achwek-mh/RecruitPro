import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userservice :LoginService , private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userservice.isLoggedIn()){
        this.router.navigateByUrl('/login');
        this.userservice.deleteToken() ;
        return false ;
      }
    else {
      
        
         return true;
    }
   
  }
  
}
