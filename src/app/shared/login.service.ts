import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { User } from './user.model';


const token = localStorage.getItem('token') as string
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM1YTc4MDZjMWRmYTMzYTNlMjkzOTIiLCJSb2xlIjoiVXNlciIsImlhdCI6MTY1NzE3NDU0MH0._ioLEtQiV0wkxEyrQ0eWcG90C0MIghLkNqHuTnazrDI"
 
 //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM1NzZiZmVkNGYwOTNiNGJjNTk2NTciLCJSb2xlIjoiQWRtaW4iLCJpYXQiOjE2NTcxNDI5NDN9.-UmmNFf3QKoss3nQtn9K5p6yAglByT6y8R1quZpEDfs"
 
const headersall= new HttpHeaders({
  'x-access-token': token
});
if (token )
{var  decoded =jwt_decode(token); 

console.log(decoded['_id']); 
console.log (decoded['Role']) }

const requestOptions = { headers: headersall };

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  res:any
  role : any 
  result:any
  if(token)
{ this.role =decoded['Role']}
  login(authCredentials: any) //login(username : string , lastname : string , passw)
  {   this.res=this.http.post(environment.apiBaseUrl+'/authenticate',authCredentials)

    return this.http.post(environment.apiBaseUrl+'/authenticate',authCredentials)
  }
  getlogin() //login(username : string , lastname : string , passw)
  {
    if (this.isLoggedIn())
   {  this.res.subscribe(   
        (res) => {
      this.result = res ;
      console.log(res)
    },
    err => {
     console.log(err.error.message);
    }
  );}
    //
  }
  usersProfile(){
    return this.http.get(environment.apiBaseUrl+'/usersProfile')

  }
  setToken(token : string){
    localStorage.setItem('token',token);
    

  }
  setRole(role : string){
    localStorage.setItem('Role',role);
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
     return true
      //userPayload.exp > Date.now() / 1000;
    else
      return false;
      //return (this.getUserPayload)
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUserProfile(id :any) {
    return this.http.get(environment.apiBaseUrl + `/userProfile/${id}` , requestOptions);
  }

  getDashboard() {
    return this.http.get(environment.apiBaseUrl + '/dashboard' );
  }
  deleteToken() {
  
    localStorage.removeItem('token');
   // localStorage.removeItem('Role');
  }
  deleteUser (id :any){
    return this.http.delete(environment.apiBaseUrl+`/user/${id}`)
}
update (id :any ,user :User){
  return this.http.put(environment.apiBaseUrl+`/user/${id}`,user)

}
  localStorageClear()
{
  localStorage.clear()
}
requestReset(body){
  return this.http.post(environment.apiBaseUrl + '/forgotPass',body);
}  
newPassword(body){
  return this.http.post(environment.apiBaseUrl + '/newPass',body );
} 
ValidPasswordToken(body){
  return this.http.post(environment.apiBaseUrl + '/validPass',body );
} 

  /*   HaveAccess(){
    
     
      var role=decoded.Role
      if(role==='Admin'){
        return true
      }else{
        alert('you not having access');
        return false
      }
    } */
 
}