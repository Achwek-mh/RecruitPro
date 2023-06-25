import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Element {

  Name: string;
  Post: string;
  Scheduled_date: string;
  state: string;
  Manager_Concerned :string ;
  Result : string ;
  Date2 :string ;
 

}

;
let statee :string ;
let bool =false ;
let ELEMENT_DATA :Element[]=[
  {Name: '', Post: '' , Scheduled_date: "", state: '' ,Manager_Concerned :"" , Result :"" , Date2 :""  }];





let DATA = [{}]


 @Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'] ,
  providers :[DashboardService]
})

 
export class TablesComponent implements OnInit {
 result :any ;
 result1 : any ;

  showSucessMessage : boolean| undefined ;
  serverErrorMessages :string | undefined  ;
  displayedColumns: string[] = ['Name', 'Post', 'Scheduled_date', 'state' ,'Manager_Concerned' ,'Result' , 'Date2' ];
  dataSource = ELEMENT_DATA;

   candidatDetails : any  ;
   internDetails: any  ;

  constructor (public  dashboardservice : DashboardService , private formbuilder :FormBuilder , private router :Router) {}
   ngOnInit(): void {
    this.getCandidats()
    this.dashboardservice.getIntern().subscribe(
      (res ) => {
        this.result1 =res ;

       for (let j=0 ; j<this.result1.length ; j++)
      {  this.internDetails = this.result1[j]
         
     }},
      
      err => { 
        console.log(err);
        
      }
    );
  }
  resetForm(form: NgForm) {
    form.reset()
     
    }




i=0 ;
  save(form : NgForm){
    
   this.dashboardservice.postCandidat(form.value).subscribe(
    res => {
      this.showSucessMessage = true;
      this.getCandidats()
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
        this.serverErrorMessages = 'Something went wrong.';
    
      }
  );

  
  console.log (form.value)
  }


  Save(form : NgForm){
   
   this.i++;
    this.dashboardservice.postIntern(form.value).subscribe(
     res => {
       this.showSucessMessage = true;
     },
     err => {
         this.serverErrorMessages = 'Something went wrong.';
     }
   );
 
   this.resetForm(form)
   console.log (form.value)
   }
  
   getCandidats(){
    this.dashboardservice.getCandidat().subscribe(
      (res ) => {
        this.result =res ;
        //this.candidatDetails[0]=this.result[0]
       for (let j=1 ; j<this.result.length ; j++)
      {   
        //this.candidatDetails = [...this.candidatDetails,this.result[j]]
        this.candidatDetails = this.result[j]
        statee =this.candidatDetails.state ;
        if (statee==="Done") 
        {bool=true ;


        console.log(statee) ;}
     }
     console.log(this.candidatDetails) ;},
      
      err => { 
        console.log(err);
        
      }
    );
   }
  
  
  


}  

function input() {
  throw new Error('Function not implemented.');
}
