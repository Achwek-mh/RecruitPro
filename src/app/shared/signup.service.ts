import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private users: User[] = [];
  private users$ = new Subject<User[]>();

  constructor(private http: HttpClient) { }




  postUser(firstname: string,lastname: string,email: string,password: string,Role: string, image: File): void {
    const userData = new FormData();
    userData.append("firstname", firstname);
    userData.append("lastname", lastname);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("Role", Role);
    userData.append("image", image);
    console.log(userData)
    this.http
      .post(environment.apiBaseUrl+'/register', userData)
      .subscribe((userData) => {
        const user: User = {
          firstname: firstname,
          lastname: lastname,
          email :email ,
          password:password,
          Role:Role,
          imagePath: userData['image']
        };
        console.log(user.imagePath);
        console.log(user)
        this.users.push(user);
        this.users$.next(this.users);
      });
  }
}