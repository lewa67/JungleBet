import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ViewChild('form', {static: true} ) signupForm: NgForm;
  // firstname: string;
  // lastname: string;
  // password: string;
  // username: string;
  // address: string;
  // country: string;
  // city: string;
  userForm: FormGroup;
  

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
   this.userForm=new FormGroup({
     firstname: new FormControl(undefined,[Validators.required,Validators.minLength(3)]),
     lastname: new FormControl(undefined,[Validators.required,Validators.minLength(3)]),
     address: new FormControl(undefined,[Validators.required,Validators.minLength(10)]),
     city: new FormControl(undefined,[Validators.required,Validators.minLength(4)]),
     country: new FormControl(undefined,[Validators.required,Validators.minLength(5)]),
     username: new FormControl(undefined,[Validators.required,Validators.minLength(4)]),
     password: new FormControl(undefined,[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,}$")])
   })
   
  }

  // onSubmit(form: NgForm){

  //   let user:User=new User(this.username,this.password);
  //   this.httpClient.post(`http://localhost:3000/auth/register`,user).subscribe((res:any)=>{
  //     console.log(res);
  //   })
  //   form.reset();

  // }

  onSubmit(){
    console.log(this.isInvalid());
    if(this.userForm.valid){
      let user:User=new User(this.userForm.value.username,this.userForm.value.password);
      this.httpClient.post(`http://localhost:3000/auth/register`,user).subscribe((res:any)=>{
        console.log(res);
      })
      this.userForm.reset();
    }
    
  }
 
  isInvalid(){
    return this.userForm.controls.firstname.status
  }
}
