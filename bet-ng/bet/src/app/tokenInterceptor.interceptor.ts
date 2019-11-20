import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    req: HttpRequest<any>;
    constructor(private authService: AuthService){
        
    }

    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.getToken()){
            let token= this.authService.getToken()
            // let header=request.headers.set("Cookies",`TOKEN=${token};`)
            request=request.clone({withCredentials: true})
        }
        return  next.handle(request);
      }

      
    //   private  addToken(request: HttpRequest<any>) {
    //     //  let toks= this.authService.getToken()
    //     this.req=request.clone({setHeaders:{"Authorization":`${localStorage.getItem("token")}` }})
    //     return this.req;
    //   }
      
}

// ***********Wrong**********
// Host: localhost:3000
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
// Accept: application/json, text/plain, */*
// Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
// Accept-Encoding: gzip, deflate
// 
// Origin: http://54.171.173.116:4200
// Connection: keep-alive
// Referer: http://54.171.173.116:4200/bet
// If-None-Match: W/"75b-8zzo/k7nbZNebtF7jJTOLDV85W4"
// Cache-Control: max-age=0


// Host: localhost:3000
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
// Accept: application/json, text/plain, */*
// Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
// Accept-Encoding: gzip, deflate
// Origin: http://54.171.173.116:4200
// Connection: keep-alive
// Referer: http://54.171.173.116:4200/bet
// Cache-Control: max-age=0
// If-None-Match: W/"75b-8zzo/k7nbZNebtF7jJTOLDV85W4"