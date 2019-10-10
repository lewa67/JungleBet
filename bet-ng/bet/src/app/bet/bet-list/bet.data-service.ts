import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';

import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import { Bet } from './bet.model';
import { Router } from '@angular/router';



@Injectable()
export class BetDataService extends DefaultDataService<Bet> {


    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator, private router: Router) {
        super('Bets', http, httpUrlGenerator);

    }

    getAll(): Observable<Bet[]> {
    
            return  this.http.get<Bet[]>(`http://localhost:3000/api/v1/bet`).pipe(catchError(err =>{
                console.log("Double merde");
                let bet:Bet[]=[]
                
                return of(bet)
              })).pipe(map(bets=>{
                return bets.map((bet:Bet)=>{
                     return new Bet(bet.teams,bet.quotation,bet.competition,bet.country,bet.date, bet._id, bet.score, bet.dateOfMatch)
                 })
             }));
        

    }

}