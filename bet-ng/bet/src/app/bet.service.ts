import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bet } from './bet/bet-list/bet.model';
// import { Bet } from './bet/bet-list/bet.model';

@Injectable()
export class BetService {
  betSelected= new Subject<Bet>();
  bets: Bet[]=[];
  totalQuotation: number=1;
  gain: number;
  constructor() { }
}
