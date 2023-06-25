import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { LoginService } from "../shared/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : LoginService,private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const authToken =this.userService.getToken()
            const clonedreq =authToken? req.clone({
                headers: req.headers.set("x-access-token", "Bearer " +authToken )
            }):req;
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}