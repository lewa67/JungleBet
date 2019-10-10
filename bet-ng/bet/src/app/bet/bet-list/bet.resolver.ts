import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {of,from} from 'rxjs';

import {filter, first, map, tap, catchError} from 'rxjs/operators';
import { BetEntityService } from './bet.entity-service';
import { Bet } from './bet.model';


@Injectable()
export class BetResolver implements Resolve<boolean> {

    constructor(private betService: BetEntityService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {
    
               
        return this.betService.loaded$.pipe(tap(loaded=>{
            // this.betService.getAll()
            if(!loaded){
                console.log("merdeeee")
                    
                    this.betService.getAll();
                    console.log("no khey")
            
                
                
            }
        }),filter(loaded=>!!loaded),first()
        ) 
    
    
    

   

    }

}