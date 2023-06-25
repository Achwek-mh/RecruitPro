import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuard } from 'src/app/guard/role.guard';
import { AgendaComponent } from 'src/app/pages/Agenda/Agenda.component';
import { InternshipComponent } from 'src/app/pages/internship/internship.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent , canActivate: [AuthGuard ]  /* ,RoleGuard ]   , data : {expectedRole : 'Admin'} */ },
    { path: 'user-profile',   component: UserProfileComponent  ,canActivate: [AuthGuard  ]  },
    {path: 'agenda',   component: AgendaComponent ,canActivate: [AuthGuard  ] },
    {path: 'internship',   component: InternshipComponent}
];