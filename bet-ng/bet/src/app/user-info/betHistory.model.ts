import { Result } from '../resultat/resultat.model';

export class BetHistory{

    results: Result[]
    totalQuotation: number;
    miseTotale: number;
    totalGain:number;
    isTicketWin: boolean;


    constructor(results,totalQuotation,miseTotale, totalGain){
        this.results=this.results;
        this.totalQuotation=totalQuotation;
        this.totalGain=totalGain;
        this.miseTotale=miseTotale;
        // this.betWinner=this.bets.map(bet=>{if(bet.winner=="Match Nul"){
        //     return `Match Nul(${bet.teams[0]}-${bet.teams[1]})`
        //   }else return bet.winner})
    }

}