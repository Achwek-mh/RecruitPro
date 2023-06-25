import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../shared/login.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  constructor(private service:LoginService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token =this.service.getToken() ;
    if(token)
    {var  decoded =jwt_decode(token);
      const role = decoded['Role'] ; 
      console.log(role) 
      const expectedRole = route.data.expectedRole
     if(role===expectedRole){
      return true
    }else{
     Swal.fire({
      title: 'You have no access',
      
      icon: 'error'
    });
   }
    }
    
   
     this.router.navigateByUrl('/dashboard');
     return false;
   
  }
}