import { Component, ElementRef, OnInit ,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  result:any
   url = "http://localhost:4200/#/register"
  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;

 
  constructor( private loginservice : LoginService , private router :Router) { }
    model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errormessage: string | undefined;
  ngOnInit() {
    if(this.loginservice.getToken()==='')
     this.router.navigateByUrl('/login')
   
   
  }

  onSubmit(form : NgForm){
    this.loginservice.getlogin()

      this.loginservice.login(form.value).subscribe(
        (res) => {
          this.result = res ;
          console.log(res)
          this.loginservice.setToken(this.result.token);
          this.loginservice.setRole(this.result.Role ) ;
          this.router.navigateByUrl('/dashboard');
        },
        err => {
          this.errormessage = err.error.message;
        }
      );
      
    }

    
  }
  
  
    