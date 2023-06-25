import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { Candidat } from 'src/app/shared/candidat.model';
import jwtDecode from 'jwt-decode';


  
  ;
  let statee :string ;
  let bool =false ;
  
  

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  entry: Candidat = {
     id :'' ,
    Name : 
    '' ,
    Email :'',
    Post: 
         '' ,
    Scheduled_date: 
         '' ,
    state: 
         '' ,
    Manager_Concerned: 
         '' ,
    Result: 
         '',
    Date2: 
         '',
         Time :''

  };


  public focus;
  public listTitles: any[];
  public location: Location;
  candidatDetails : any  ;
data =[] ;
imageData:string ;
n : number ;
result :any;
term :any ;
Name :string ;
firstname : string ;
lastname : string ;
imagePath :string ;

  constructor(location: Location,  private element: ElementRef, private router: Router ,  public userService: LoginService ,private service : DashboardService) {
    this.location = location;
   
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
   this.getuser()
   this.getUserprofile()
}
getuser(){
  if(this.userService.isLoggedIn()){
    var decoded =jwtDecode(this.userService.getToken())
    console.log(decoded['_id'])
    return(decoded['_id'])
  }
}

getUserprofile (){
  
  if (this.userService.isLoggedIn()){
  
    this.userService.getUserProfile(this.getuser()).subscribe(
     (res) => { this.result=res
      this.firstname= this.result.firstname;
       this.lastname= this.result.lastname ;
    
       this.imageData=this.result.imagePath
     },
     
    )}
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  getCandidats(){
    this.service.getCandidat().subscribe(
      (res ) => {
        this.result =res ;
        this.candidatDetails = this.result[0]

       for (let j=1 ; j<this.result.length ; j++)
      {   
        this.candidatDetails = this.result[j]
        console.log(this.candidatDetails.id)
     }
     console.log(this.candidatDetails) ;
    },

      
      err => { 
        console.log(err);
        
      }
    );
   }
   Search() {
    if (this.Name != '') {
      this.data = this.data.filter((res) => {
        return res.Name.match(this.Name);
      });
    } else if (this.Name == '') {
      this.ngOnInit();
    }
  }
}
