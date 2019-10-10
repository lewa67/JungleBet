import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    
    if (this.authService.getToken() !="") {
      this.router.navigate(["/bet"])
    
    } 
      return !(!!this.authService.getToken());
    
    
  }
}