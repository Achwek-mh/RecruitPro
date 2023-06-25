import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LoginService } from 'src/app/shared/login.service';

import jwtDecode from 'jwt-decode';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

 UserToUpdate = {
  _id :'',
  firstname: '',
    lastname: '',
    Role : '',
    email: '', 
    imagePath:'',
    password:''
   }
 postt :string ;
  constructor(private modalService :NgbModal , config :NgbModalConfig , public userService: LoginService ,private service : DashboardService) { }
  imageData:string ;
  closeResult :string ="" ;
  result1 : any ;
  public focus;
  
  
   showSucessMessage : boolean| undefined ;
   serverErrorMessages :string | undefined  ;
  n : number ;
  result :any;
  message :string;
  Role :string ;
  displayuser=false ;
  usersDetails:any;
  term :any ;
  Name :string ;
  firstname : string ;
  lastname : string ;
  ngOnInit() {
   this.getuser()
  this.getUserprofile()
  this.displayButtons()
}
getuser(){
   if(this.userService.isLoggedIn()){
    var decoded =jwtDecode(this.userService.getToken())
    console.log(decoded['_id'])
    return(decoded['_id'])
  } 
}
displayButtons(){
  if (this.userService.getToken() !=''){
    var decoded =jwtDecode(this.userService.getToken())
    this.Role =decoded['Role']
    this.displayuser = this.Role =='Admin';
    console.log(this.displayuser)
  }
 }


   getUserprofile (){
  
  
    this.userService.usersProfile().subscribe(
     (res) => { this.result=res
      console.log(this.result)
    

   },

     
     err => { 
       console.log(err);
       
     }
   );
  }
  update () {
    console.log(this.UserToUpdate)
    this.userService.update(this.UserToUpdate._id, this.UserToUpdate).subscribe((res) => {
      if(res)
 {     Swal.fire({
       
        text:   "the User was updated successfully",
        confirmButtonText: 'Cancel',
        icon : "success" ,
        confirmButtonColor:"#979292 "
    
      }) }
   console.log( this.message ='the User was updated successfully'    )  },
    err =>{
      
        this.serverErrorMessages = err.error.join('<br/>')
        console.log(this.serverErrorMessages);
      
      
    });
  }
  editOpen (user: any, content : any){
    this.UserToUpdate = user;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass",backdrop:false}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

delete(id:any){
 console.log(id)
Swal.fire({
          text:   "Are you sure you want to delete this User ?",
          icon: 'warning' ,
          showCancelButton: true,  
  confirmButtonText: `Yes`,  
  confirmButtonColor: "#ff6873", 
      
        }).then((result) => {
          if (result.isConfirmed) {

this.deletee(id) ;   
Swal.fire({text:   "User was deleted successfully",
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
    

      this.userService.deleteUser(id).subscribe((res) => {
        
        this.getUserprofile()} ,
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
  


