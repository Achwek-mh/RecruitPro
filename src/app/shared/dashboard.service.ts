import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Candidat } from './candidat.model';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   selectedCandidat:  Candidat = {
    id :'',
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

  
   }
   selectedIntern:  Candidat = {
     id :'',

     Name :
           '' ,
           Email :'',
     Post: 
          '' ,
     Scheduled_date: 
          '' ,
     state: 
          ' ' ,
     Manager_Concerned: 
           '' ,
     Result: 
          '',
     Date2: 
          '',
          Time :''
   
    }
  constructor(private http : HttpClient) { }
  postCandidat (candidat :Candidat) {
    return this.http.post(environment.apiBaseUrl+'/save',candidat) ;
  }
  getCandidat () {
     return this.http.get(environment.apiBaseUrl+'/candProfile') ;
   }
   postIntern (intern: Candidat) {
     return this.http.post(environment.apiBaseUrl+'/savee',intern) ;
   }
   getIntern () {
      return this.http.get(environment.apiBaseUrl+'/internProfile') ;
    }
 deleteCandidat (id :any){
     return this.http.delete(environment.apiBaseUrl+`/cand/${id}`)
 }
 deleteIntern(id :any){
     return this.http.delete(environment.apiBaseUrl+`/intern/${id}`)
 }
 update (id :any ,candidat :Candidat){
     return this.http.put(environment.apiBaseUrl+`/cand/${id}`,candidat)

 }
 Update (id :any ,intern : Candidat){
     return this.http.put(environment.apiBaseUrl+`/intern/${id}`,intern)

 }
 countInterns(){
     return this.http.get(environment.apiBaseUrl+'/count/1')

 }
 countCands(){
     return this.http.get(environment.apiBaseUrl+'/count/2')

 }

}
