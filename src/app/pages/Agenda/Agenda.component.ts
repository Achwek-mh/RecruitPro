  import { Component, OnInit } from '@angular/core';
 import { CalendarOptions } from '@fullcalendar/angular';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { FormBuilder, FormControl, FormGroup ,NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/shared/login.service';
import jwtDecode from 'jwt-decode';

declare let $: any;
export interface element {
  title : string ,
  date : string ,
  color :string,
 start :string,

}
export interface element1 {
  Name : 
  String | undefined ;
  Email: 
     String | undefined ;
Post: 
     String | undefined ;
Scheduled_date: 
     String | undefined ;
state: 
     String | undefined ;
Manager_Concerned: 
     String | undefined ;
Result: 
     String | undefined;
Date2: 
     String | undefined;
time : String | undefined;

}
let Events : element[]=[{title :'' ,date :'' , color :'',start:''}]
@Component({
  selector: 'app-Agenda',
  templateUrl: './Agenda.component.html',
  styleUrls: ['./Agenda.component.scss'] ,
  providers : [DashboardComponent ]
  
})


export class AgendaComponent implements OnInit {
  result :any ;
  successdata:any ;
  post !:string ;
  addEventForm!: FormGroup ;
  submitted = false;
  data :any={};
  data2val :any[]
  data2key:any[]
  data2 : any[]
  showSucessMessage ! : boolean ;
  date !: any ;
  Role:string;
  displayuser=false ;
    
  events=Events
  calendarOptions!: CalendarOptions;
  serverErrorMessages! :string ;
  //Add user form actions
  get f() { return this.addEventForm?.controls; }

  constructor(private value :DashboardComponent , private dashboardservice : DashboardService ,private formBuilder: FormBuilder, private router:Router ,private service :LoginService ){}
ngOnInit() {
    this.getCandidat () ;
    this.getIntern ();
    this.Edit();
  


    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]] ,
      interview : ['', [Validators.required]] ,
      post :['',[Validators.required]],
      Manager :['',[Validators.required]],
     email:['',[Validators.required]],
     time:['',[Validators.required]]

      }); }
  


  
handleDateClick(arg:any ) {
    $("#myModal").modal({backdrop :false}) ;
    $("#myModal").modal("show") ;
    $(".modal-title, .eventstarttitle").text("");
    $(".modal-title").text("Add Interview at : "+arg.dateStr);
    $(".eventstarttitle").text(arg.dateStr);
    this.date =arg.dateStr;}
   
  

onSubmit() {
  
          this.submitted = true;
          this.addEventForm.get('title')?.setValidators([Validators.required]);
          this.addEventForm.get('title')?.updateValueAndValidity();
          this.addEventForm.get('interview')?.setValidators([Validators.required]);
          this.addEventForm.get('interview')?.updateValueAndValidity();
          this.addEventForm.get('post')?.setValidators([Validators.required]);
          this.addEventForm.get('post')?.updateValueAndValidity();
          this.addEventForm.get('Manager')?.setValidators([Validators.required]);
          this.addEventForm.get('Manager')?.updateValueAndValidity();
          this.addEventForm.get('email')?.setValidators([Validators.required]);
          this.addEventForm.get('email')?.updateValueAndValidity();
          this.addEventForm.get('time')?.updateValueAndValidity();
      this.data = { Name :  this.addEventForm.get('title')?.value,Email :  this.addEventForm.get('email')?.value , Post: this.addEventForm.get('post')?.value , Scheduled_date: this.date, state: '' ,Manager_Concerned : this.addEventForm.get('Manager')?.value , Result :"" , Date2 :"" ,Time : this.addEventForm.get('time')?.value };

      if (this.addEventForm?.invalid) {
            return;
        }
      if (this.submitted){
          
          if (this.addEventForm.get('interview')?.value=='recruitement'){ 
          

              this.dashboardservice.postCandidat(this.data).subscribe(
              res => { this.getCandidat () ;
                console.log(res)
                this.successdata=res
                this.showSucessMessage = true;
              
              
                Swal.fire({
                title: 'Great!!',
                text:   this.addEventForm.value.title+" has been added successfully",
                icon: 'success'
              });
              
            
              
              
              },
              err => {
                this.successdata=err
                  this.serverErrorMessages = 'Something went wrong.';
            
              
                }
              
            ); 
            console.log(this.data) 
         
            $("#myModal").modal("hide") ;

            
          }
          else if (this.addEventForm.get('interview')?.value=='internship'){ 
          

            this.dashboardservice.postIntern(this.data).subscribe(
            res => {
            
        this.getIntern ();

              this.showSucessMessage = true;
              Swal.fire({
                title: 'Great!!',
                text:   this.addEventForm.value.title+" has been added successfully",
                icon: 'success' ,
              });
            
            },
            err => {
                this.serverErrorMessages = 'Something went wrong.';
            
              }
            
          ); 

          $("#myModal").modal("hide") ;
        }}
}
        

hideForm(){
    this.addEventForm?.patchValue({ title : ""});
    this.addEventForm?.get('title')?.clearValidators();
    this.addEventForm?.get('title')?.updateValueAndValidity();
    $("#myModal").modal("hide") ;
  
}

getCandidat (){
        this.dashboardservice.getCandidat().subscribe(
          (res ) => {
          this.result=res ;
        
          for (let j=0 ; j<this.result.length ; j++) {
      

    this.calendarOptions = {
          
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
    
      dateClick: this.handleDateClick.bind(this),
    events: this.events=[...this.events,{title :this.result[j].Name , date : this.result[j].Scheduled_date , color :'#7aaddf' ,   start: this.result[j].Scheduled_date + `T${this.result[j].Time}:00`} ]
    };
          }
        } )
}

getIntern (){
            this.dashboardservice.getIntern().subscribe(
              (res ) => {
              this.result=res ;
              for (let j=0 ; j<this.result.length ; j++) {
          
        
        this.calendarOptions = {
              
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          initialView: 'dayGridMonth',
        
          dateClick: this.handleDateClick.bind(this),
        events: this.events=[...this.events,{title :this.result[j].Name , date : this.result[j].Scheduled_date ,color :'#dc6b6b', start: this.result[j].Scheduled_date + 'T09:00:00'} ]
        
          
        
        
        };
        
              }
          
            } )
}



Edit(){
      if (this.service.getToken() !=''){
        var decoded =jwtDecode(this.service.getToken())
        this.Role =decoded['Role']
        this.displayuser = this.Role =='Admin';
        console.log(this.Role)
      }
     }
   
} 

  

