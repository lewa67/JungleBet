import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[]=[];
  roles: string[];
  state:string="";
  
  constructor(private http: HttpClient, private router: Router, private socket: Socket) { }

  ngOnInit() {
  this.http.get('http://localhost:3000/api/v1/userList').subscribe((users:User[])=>{
    this.users=users
    this.users.shift()
   
    // if(localStorage.length>0){
    //   for (let i:number=0;i< localStorage.length;i++){
    //     let utilisateurs: User[]=[]
    //     if(users.find(user=>{
    //       return user.username==localStorage.key(i)})!=undefined){
    //         utilisateurs.push(users.find(user=>{
    //           return user.username==localStorage.key(i)}))
    //         utilisateurs.find(user=>{
    //       return user.username==localStorage.key(i)}).state=localStorage.getItem(localStorage.key(i))
    //       }
        
    //   }
    // }

    this.http.get('http://localhost:3000/auth/usersConnectionState').subscribe((userWithState:User[])=>{
    userWithState.forEach(user => {
      let utilisateur=this.users.find(element=>element.username==user.username)
      utilisateur.state=user.state
    });
  })
 
  }
  
  
  )

  
  
  
  
  this.socket
        .fromEvent("ConnectionState")
        .subscribe((data:User[])=>{
          data.forEach(user => {
            let utilisateur=this.users.find(element=>element.username==user.username)
            utilisateur.state=user.state
          });
      //  let use= this.users.find(user=>user.username==data.username)
      //  use.state=data.state;
      //  localStorage.setItem(data.username,data.state)
      //  console.log("data recue")
        });

        this.socket
        .fromEvent("ConnectionLoggedOut") 
        .subscribe((data:User)=>{
          
            let utilisateur=this.users.find((element:User)=>element.username==data.username)
            utilisateur.state=data.state
            console.log(utilisateur)}
          );
      //  let use= this.users.find(user=>user.username==data.username)
      //  use.state=data.state;
      //  localStorage.removeItem(data.username)
      //  console.log("data recue")
      
  }
  

  


  delete(username:string){
    this.http.delete(`http://localhost:3000/api/v1/user?username=${username}`).subscribe(el=>this.http.get('http://localhost:3000/api/v1/user').subscribe((users:User[])=>{
      this.users=users
   
    }))
    
  console.log(`http://localhost:3000/api/v1/user?username=${username}`)
  }

  redirectToUser(){

  }

 

}
