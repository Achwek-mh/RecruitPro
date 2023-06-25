import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl,ReactiveFormsModule  } from '@angular/forms';
import { SignupService } from '../../shared/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers :[SignupService]
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | undefined;
  serverErrorMessages: boolean | undefined;
  imageData :string
  signUpForm!: FormGroup ;
  submitted = false;
  data :any={} ;
  constructor(private formBuilder: FormBuilder , public signupService : SignupService , private router :Router) { }
  get f() { return this.signUpForm?.controls; }
  onSubmit() {
    
    this.submitted = true;
    //this.showSucessMessage=true ;

    this.data = { firstname :  this.signUpForm.get('firstname')?.value , lastname: this.signUpForm.get('lastname')?.value  ,email: this.signUpForm.get('email')?.value ,password :  this.signUpForm.get('password')?.value , Role :  this.signUpForm.get('Role')?.value   };
    if (this.signUpForm?.invalid) {
      this.serverErrorMessages=true;
  }
  if (this.submitted && this.signUpForm?.valid){
    const user ={firstname :this.signUpForm.value.firstname ,lastname :this.signUpForm.value.lastname,email:this.signUpForm.value.email,password :this.signUpForm.value.password,Role : this.signUpForm.value.Role,imagePath:this.signUpForm.value.image}
    console.log(user)
    this.signupService.postUser(this.signUpForm.value.firstname , this.signUpForm.value.lastname  ,this.signUpForm.value.email , this.signUpForm.value.password , this.signUpForm.value.Role ,this.signUpForm.value.image )
    this.showSucessMessage=true ;
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
    //this.signUpForm.reset();
    this.imageData = null;
  }
}
    //login form
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstname: new FormControl(null) ,
      lastname:  new FormControl(null) ,
      email : new FormControl(null) ,
      password : new FormControl(null) ,
      Role: new FormControl(null) ,
      image: new FormControl(null),
      }); 
   
  
}

onFileSelect(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.signUpForm.patchValue({ image: file });
  console.log({image:file})
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (file && allowedMimeTypes.includes(file.type)) {
    const reader = new FileReader();
     reader.onload = () => {
      this.imageData = reader.result as string;
      console.log(this.imageData)
    }; 
    reader.readAsDataURL(file);
    console.log(file);
  }
}

  }







