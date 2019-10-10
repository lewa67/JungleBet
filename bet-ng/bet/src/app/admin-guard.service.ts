import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Payload } from './payload.model';
import {map} from 'rxjs/operators';


Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin: boolean=false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

 canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
   
    if (this.authService.getToken()=="") {
      this.router.navigate(["/auth"])
    } 
     
  return this.http.get('http://localhost:3000/auth/userConnected').pipe(map((user:Payload)=>{
    if (!user.roles.includes("Admin")){
      this.router.navigate(["/bet"])
    }
   return user.roles.includes("Admin")
  }))
     
    
    
  }
  
}
