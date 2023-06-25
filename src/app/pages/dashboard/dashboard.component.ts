import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


export interface Element {
id : string ;
  Name: string;
  Post: string;
  Email :string ;
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
  {id : '' ,Email :'', Name:'', Post:'' , Scheduled_date:'', state: '' ,Manager_Concerned :"" , Result :"" , Date2 :""  }];






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers :[NgbModalConfig,NgbModal]
})
export class DashboardComponent implements OnInit {
  model: NgbDateStruct;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;


  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [2, 4, 8, 10];

  onTableDataChange(event: any) {
    this.page = event;
    this.getCandidats();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCandidats();
  }


  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
resu :any ;
  searchtext : string ;
  closeResult :string ="" ;
  result :any ;
  result1 : any ;
  data =[] ;
  public focus;
  candidatToUpdate = {
    id :'',Email:'', Name:'', Post:'' , Scheduled_date:'', state: '' ,Manager_Concerned :"" , Result :"" , Date2 :"" ,Time :"" }
   
  
   showSucessMessage : boolean| undefined ;
   serverErrorMessages :string | undefined  ;
   displayedColumns: string[] = ['Id' ,'Email','Name', 'Post', 'Scheduled_date', 'state' ,'Manager_Concerned' ,'Result' , 'Date2' ];
   dataSource = ELEMENT_DATA;
    Role: string ;
    candidatDetails : any  ;
    internDetails: any  ;
   message: string;
 displayuser=false ;
   constructor (public  dashboardservice : DashboardService , private formbuilder :FormBuilder , public router :Router , private  service : LoginService , private modalService :NgbModal , config :NgbModalConfig ,calendar: NgbCalendar) {    config.backdrop = false;
  

}
ngOnInit(): void {
     this.getCandidats() ;
     this.displayButtons();
    
    this.Role = this.service.role
    console.log (this.Role)
    
}

 
 
resetForm(form: NgForm) {
     form.reset()
      
}
 
 
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
       
     
       }
   );
 
   this.resetForm(form);
   console.log (form.value)
   }
   displayButtons(){
    if (this.service.getToken() !=''){
      var decoded =jwtDecode(this.service.getToken())
      this.Role =decoded['Role']
      this.displayuser = this.Role =='Admin';
    }
}
 
 

  
getCandidats(){
     this.dashboardservice.getCandidat().subscribe(
       (res ) => {
         this.result =res ;
         this.candidatDetails = this.result[0]

        for (let j=1 ; j<this.result.length ; j++)
       {   
         this.candidatDetails = this.result[j]
         statee =this.candidatDetails.state ;
         if (statee==="Done") 
         {bool=true ;
 
 
         console.log(statee) ;}
         console.log(this.candidatDetails.id)
      }
      console.log(this.candidatDetails) ;
     },
       
       err => { 
         console.log(err);
         
       }
     );
}
update () {
      this.dashboardservice.update(this.candidatToUpdate.id, this.candidatToUpdate).subscribe((res) => {
        if(res)
   {     Swal.fire({
         
          text:   "the candidat was updated successfully",
          confirmButtonText: 'Cancel',
          icon : "success" ,
          confirmButtonColor:"#979292 "
      
        }) }
      this.message ='the candidat was updated successfully'      },
      err =>{
        
          this.serverErrorMessages = err.error.join('<br/>')
          console.log(this.serverErrorMessages);
        
        
      });
}
editOpen (candidat: any, content : any){
      this.candidatToUpdate = candidat;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
 }
delete(id:any){
 
Swal.fire({
          text:   "Are you sure you want to delete this candidat ?",
          icon: 'warning' ,
          showCancelButton: true,  
  confirmButtonText: `Yes`,  
  confirmButtonColor: "#ff6873", 
      
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

this.deletee(id) ;   
Swal.fire({text:   "Candidat was deleted successfully",
icon: 'success' ,
confirmButtonText: `OK`, 
confirmButtonColor: "#ff6873",
})         
          } else
          Swal.fire({text:   "Cancelled",
          icon: 'error' ,
          confirmButtonText: `OK`, 
          confirmButtonColor: "#ff6873",
    })

      })


}

deletee (id :any){
    

      this.dashboardservice.deleteCandidat(id).subscribe((res) => {
        
console.log(this.candidatDetails.Name)
        this.getCandidats()} ,
      err =>{
       console.log(err) ;
});
}


private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  }


 

    
   
   
   
 
 
 
