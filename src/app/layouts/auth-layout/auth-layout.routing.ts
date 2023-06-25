import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { Auth2Guard } from 'src/app/guard/auth2.guard';
import { RoleGuard } from 'src/app/guard/role.guard';
import { ResetPassComponent } from 'src/app/pages/reset-pass/reset-pass.component';
import { ResponseResetComponent } from 'src/app/pages/response-reset/response-reset.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent  ,canActivate: [Auth2Guard  ]  } ,
    { path: 'register',       component: RegisterComponent     ,canActivate:[RoleGuard ] , data : {expectedRole : 'Admin'} },
    { path: 'reset-pass',       component: ResetPassComponent/* ,canActivate: [AuthGuard   ,RoleGuard ] * , data : {expectedRole : 'Admin'} */},
 { path: 'response-pass/:token',       component: ResponseResetComponent/* ,canActivate: [AuthGuard   ,RoleGuard ] * , data : {expectedRole : 'Admin'} */}

];
