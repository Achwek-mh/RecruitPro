import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AgendaComponent } from 'src/app/pages/Agenda/Agenda.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination'
import { NavModule } from 'src/app/navbar2/nav.module';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import listPlugin from '@fullcalendar/list';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/login.service';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuard } from 'src/app/guard/role.guard';
import { AuthInterceptor } from 'src/app/guard/auth.interceptor';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
 import { FullCalendarModule } from '@fullcalendar/angular'; 
 import { InternshipComponent } from 'src/app/pages/internship/internship.component';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Auth2Guard } from 'src/app/guard/auth2.guard';
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);  
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MdbModalModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NavModule, 
    NgxPaginationModule ,
    Ng2SearchPipeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    AgendaComponent,
    InternshipComponent
    
    
  ],
  providers: [LoginService,AuthGuard ,RoleGuard ,Auth2Guard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
   }],
   bootstrap :[InternshipComponent]
})

export class AdminLayoutModule {}
