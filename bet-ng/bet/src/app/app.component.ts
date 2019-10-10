import { Component, OnInit, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { User } from './user.model';
import { Payload } from './payload.model';
import { Socket } from 'ngx-socket-io';
import { Store, select } from '@ngrx/store';
// import { AuthActions } from './authent/login/action-type';
import { isLoggedIn, isLoggedOut } from './authent/login/auth.selector';
import { tap, map } from 'rxjs/operators';
import { AuthState } from './authent/reducers/reducer';
import { Router } from '@angular/router';
import { AuthActions } from './authent/login/action-type';
import * as $ from 'jquery'
import { BetEntityService } from './bet/bet-list/bet.entity-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'bet';
  username$:Observable<string>;
  userCurrent: any;
  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>
  @ViewChild("nav",{static: true}) menu: ElementRef;

  
  
  constructor(private authService: AuthService, private http: HttpClient, private socket: Socket, private store: Store<AuthState>, private router: Router, private renderer: Renderer2, private betEntityService: BetEntityService){

  }

  

ngOnInit(){
// $('test').slicknav({
//   label:''
// })
// window.addEventListener("beforeunload", ()=>{

//   this.username$.subscribe(name=>{
//     this.authService.removeToken();
//   this.authService.logged=false;
//     this.store.dispatch(AuthActions.logout())
//     this.socket.emit("LoggedOut", {state:"",username:name});
//   })
// })
window.addEventListener("scroll",()=>{
  console.log(window.scrollY)
  console.log(this.menu)
  if(window.scrollY>104){
    this.renderer.addClass(this.menu.nativeElement,"green")
  } else if(this.menu.nativeElement.classList.contains('green')){
    this.renderer.removeClass(this.menu.nativeElement,"green")
  }
})

// this.authService.userConnected.subscribe(username=>this.username=username)
// this.username=this.authService.getUser()
this.userCurrent=localStorage.getItem("user")

console.log({...JSON.parse(this.userCurrent),role:undefined})
// console.log(this.userCurrent!=undefined)
if (this.userCurrent!=undefined){
console.log("Disp")
this.store.dispatch(AuthActions.login({payload: {...JSON.parse(this.userCurrent),role:undefined}}))
}

this.store.subscribe((state)=>{
  console.log("state",state)
})

this.isLoggedIn$ = this.store.pipe( 
  select(isLoggedIn)
);
console.log(this.isLoggedIn$)

this.username$=this.store.pipe(select(state=>{
  console.log(typeof(state))
  return state["auth"].user.username}))

this.isLoggedOut$ = this.store
.pipe(
  select(isLoggedOut)
);
}
  
// ngOnChanges(){
//   this.http.get(`http://localhost:3000/auth/userConnected`).subscribe((payload:Payload)=>{
//     this.username=payload.username
//    })

// }



//  async getUser(){
//   await this.http.get(`http://localhost:3000/auth/userConnected`).subscribe((user: User)=>{
//     this.authService.userId.next(user.username)
//     console.log(user.username)
//   })
//   this.authService.userId.next()
//  }

  isLogged(){
    

    return !!this.authService.getToken()
    
  }

  loginPressed(){
    this.router.navigate(["/auth/login"])
  }

  registerPressed(){
    this.router.navigate(["/auth/register"])
  }
  
  
  logout(){
    
   
    
    
    this.username$.subscribe(name=>{
      this.authService.removeToken();
    this.authService.logged=false;
      this.store.dispatch(AuthActions.logout())
      this.betEntityService.clearCache()
      this.socket.emit("LoggedOut", {state:"",username:name});
    })
      
      
    
    



  }

  checkToken(){
   this.http.post(`http://localhost:3000/auth/checkToken`, {username:this.authService.getUser, token: this.authService.getToken}).subscribe(res=>{
     console.log(res)
   })
  }

info(){
  this.username$.subscribe(username=>{
    this.router.navigate(["/userInfo",username])
  })
}

}
