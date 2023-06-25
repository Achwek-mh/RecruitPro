import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-secnav',
  templateUrl: './secnav.component.html',
  styleUrls: ['./secnav.component.scss']
})
export class SecnavComponent implements OnInit {

  constructor( private dashboardservice :DashboardService) { }
count : any;
countI :any ;
result : any ;
result1 : any ;

statee ; statee1 :any ;
i;k;i1;k1 :  any;


  ngOnInit(): void {
    this.getCandNumb();
    this.getInternNumb() ;
    this.getCandState();
   this.getInternState();

  }

  getCandNumb(){
    this.dashboardservice.countCands().subscribe((res)=>{
      //console.log(res)
      this.count=res ;
      this.getCandNumb() ;
      this.getCandState()
    })
   }
   getInternNumb(){
    this.dashboardservice.countInterns().subscribe((res)=>{
      //console.log(res)
      this.countI=res ;
      this.getInternNumb();
      this.getInternState() ;
    })
   }
   getCandState(){
    this.dashboardservice.getCandidat().subscribe(
      (res)=> {
        this.result =res ;
        this.i=0 ;
        this.k= 0 ;
        
        for (let j=0; j<this.result.length ; j++)
       {   
         this.statee =this.result[j].state ;

         if (this.statee==("Done"||" Done"||" Done "||"Done ")) 
        this.i=this.i+1 ;
        else 
        {this.k= this.k+1;
        }
        
        }
      }
    )
   }
   getInternState(){
    this.dashboardservice.getIntern().subscribe(
      (res)=> {
        this.result1 =res ;
        this.i1=0 ;
        this.k1= 0 ;
        
        for (let j=0; j<this.result1.length ; j++)
       {   
         this.statee1 =this.result1[j].state ;

         if (this.statee1==("Done"||" Done"||" Done "||"Done ")) 
        this.i1=this.i1+1 ;
        else 
        {this.k1= this.k1+1;
        }
        
        }
      }
    )
   }
   

}
