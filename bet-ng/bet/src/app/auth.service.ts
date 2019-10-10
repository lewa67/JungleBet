import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, of, Subject } from 'rxjs';
import {CookieService} from "ngx-cookie-service"
import { Payload } from './payload.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginOrRegister=new Subject<String>();
  userConnected=new Subject<string>();
userLogged:string;
  logged: boolean=false;
 url="http://localhost:3000/auth"
  constructor(private http: HttpClient, private cookieService: CookieService) { }

setUserConnected(){
  this.http.get(`http://localhost:3000/auth/userConnected`).subscribe((payload:Payload)=>{
   this.userLogged=payload.username
  })
}

  login (user: User){
    return this.http.post<User>(`${this.url}/login`, user)
  }




  getToken(){
    return this.cookieService.get("TOKEN")
  }
  
  removeToken(){

    this.cookieService.delete("TOKEN")
    this.http.get(`${this.url}/logout`)
  }

  saveToken(token: string){
   let cookie= this.cookieService.set("TOKEN",token,undefined,"/",undefined)
   
  }

  saveUser(username:string){
    localStorage.setItem("username",username)

  }

  removeUser(){
    localStorage.removeItem("username")
  }

  getUser(){
    return localStorage.getItem("username");
  }

  async isAdmin(){
    let admin: boolean;
    this.http.get(`http://localhost:3000/auth/userConnected`).subscribe((user:Payload)=>{
     admin=user.roles.includes("Admin")
      })
      return admin
  }
  
 
}
