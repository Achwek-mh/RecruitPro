import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatSidenavModule,
    MatExpansionModule,
    CdkAccordionModule,
    Ng2SearchPipeModule,
    FormsModule ,
    MatToolbarModule  
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ],
  bootstrap :[SidebarComponent]
})
export class ComponentsModule { }
