import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


export interface Element {
    id : string ;
    Name: string;
    Email :string;
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
    {id : '' ,Email:'', Name:'', Post:'' , Scheduled_date:'', state: '' ,Manager_Concerned :"" , Result :"" , Date2 :""  }];
  
  
  
  
  
  let DATA = [{}]
  
  


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.scss'],
  providers :[NgbModalConfig,NgbModal]
})
export class InternshipComponent implements OnInit {
  model: NgbDateStruct;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult :string ="" ;
  result :any ;
  result1 : any ;  
  public focus;
  searchtext : string ;
  POSTS: any;
 page: number = 1;
 count: number = 0;
 tableSize: number = 5;
 tableSizes: any = [3, 6, 9, 12];
 emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 onTableDataChange(event: any) {
  this.page = event;
  this.getInterns();
 }
 onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getInterns();
 }
  InternToUpdate = {
    id :'',
    Email :'',
     Name:'', 
     Post:'' ,
      Scheduled_date:'', 
      state: '' ,
      Manager_Concerned :"" , 
      Result :"" ,
       Date2 :"" ,
      Time :"" }
  
   showSucessMessage : boolean| undefined ;
   serverErrorMessages :string | undefined  ;
   displayedColumns: string[] = ['Id' ,'Name', 'Post', 'Scheduled_date', 'state' ,'Manager_Concerned' ,'Result' , 'Date2' ];
   dataSource = ELEMENT_DATA;
    Role: string ;
    candidatDetails : any  ;
    internDetails: any  ;
   message: string;
 displayuser=false ;
   constructor (public  dashboardservice : DashboardService , private formbuilder :FormBuilder , public router :Router , private  service : LoginService , private modalService :NgbModal , config :NgbModalConfig ,calendar: NgbCalendar) {    config.backdrop = false;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

}

    ngOnInit(): void {
     this.displayButtons();
     this.getInterns();
    this.Role = this.service.role
    console.log (this.Role)
    
   }
   /* getInternNumb(){
    this.dashboardservice.countInterns().subscribe((res)=>{
      console.log(res)
      this.count=res ;
    })
   } */
getInterns(){
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
   onDateSelection(date: NgbDate) {
    console.log(this.fromDate)

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.toDate)

  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
   resetForm(form: NgForm) {
     form.reset()
      
     }
 
 

   displayButtons(){
    if (this.service.getToken() !=''){
      var decoded =jwtDecode(this.service.getToken())
      this.Role =decoded['Role']
      this.displayuser = this.Role =='Admin';
    }
   }
 
 
   save(form : NgForm){
    
     this.dashboardservice.postIntern(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        this.getInterns()
       

      },
      err => { if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
          this.serverErrorMessages = 'Something went wrong.';
      }
    );
  
   this.resetForm(form);
    console.log (form.value)
    }
   

    update () {
   console.log(this.InternToUpdate)
      this.dashboardservice.Update(this.InternToUpdate.id, this.InternToUpdate).subscribe((res) => {

        Swal.fire({
         
          text:   "the candidat was updated successfully",
          confirmButtonText: 'Cancel',
          icon : "success" ,
        
          confirmButtonColor: "#979292",
      
        })
        console.log("edited")


      this.message ='the candidat was updated successfully'      },
      err =>{
       console.log(err) ;
});
    }
    editOpen (candidat: any, content : any){
      this.InternToUpdate = candidat;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    delete (id : any){
      Swal.fire({
        text:   "Are you sure you want to delete this candidat ?",
        icon: 'warning' ,
        showCancelButton: true,  
confirmButtonText: `Yes`, 

confirmButtonColor: "#ff6873", 
    
      }).then((result) => {
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

    deletee (id : any){
      this.dashboardservice.deleteIntern(id).subscribe((res) => {
        console.log(res) ;
        console.log("deleted")

        this.getInterns()} ,
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


 

    
   
   
   
 
 
 


