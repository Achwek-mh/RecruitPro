import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecnavComponent } from './secnav/secnav.component';


@NgModule({
  declarations: [SecnavComponent],
  imports: [
    CommonModule,
    
  ],
  exports :[
    SecnavComponent,
  ]
})
export class NavModule { }
