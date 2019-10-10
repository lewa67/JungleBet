import { Component, OnInit, ViewChild } from '@angular/core';
// import { User } from '../../user.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { TokenInterceptor } from '../../tokenInterceptor.interceptor';
import { Payload } from '../../payload.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {AuthActions} from './action-type'
import { User } from 'src/app/user.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User=new User("","");
  username: string;
  password: string;
  userId: string;
  authenticated: boolean=false;
  wrongPassword: boolean=false;
  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router,private socket: Socket,   private store: Store<{username:string, role:string}>) { 
  }

  ngOnInit() {
   
  }
onSubmit(form:NgForm){
 this.httpClient.post(`http://localhost:3000/auth/login`,{username:this.username,password:this.password}).subscribe( async (res:any)=>{
    this.authService.saveToken(res.token)
    console.log(res.token)
    console.log(res.user);
    this.authenticated=true;
    console.log("DISPATCH")
    this.store.dispatch(AuthActions.login({payload:{username:res.user.username,role:res.user.role}}))
   
    setTimeout(()=>this.router.navigate(["/bet"]),1000)
    // this.router.navigate(["/bet"])
    this.authService.logged=true;
    this.authService.saveUser(res.user.username)

    if(this.authService.getToken()){
      this.socket.emit("Logged", {state:"User Connected",username:res.user.username});
      console.log("KHEYYYYYYYYYYYY",this.authService.getUser() )
      this.authService.userConnected.next(this.authService.getUser())
    }
    
  await  this.httpClient.get(`http://localhost:3000/auth/userConnected`).subscribe((user:Payload)=>{
  console.log(user.username)
  console.log("TESTTTTTTTTT")
  

})
    
   }
    
  , (error:any)=>{
    console.log("Wrong Credentials:", error)
    this.wrongPassword=true;
  })
 

  form.reset();
}
print(){
  console.log(this.authService.getToken())
  console.log(this.authService.logged)
  
}
// test(){
//   this.httpClient.get(`http://localhost:3000/auth/success`).subscribe((res:any)=>{
  
//     console.log(res);
//   })
// }


}


​