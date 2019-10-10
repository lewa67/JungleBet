import { Bet } from '../bet/bet-list/bet.model';

export class Result{
    bet: Bet;
    winingbet:number;
    isBetWin: boolean;
    winner: string;
    score: string[];
    finaleWinner: string;
}