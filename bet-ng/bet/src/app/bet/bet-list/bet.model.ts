export class Bet{
    _id: string;
    teams: string[];
    quotation: number[];
    competition: string;
    country: string;
    date: Date;
    winner: string;
    score:[];
    result:string;
    winingbet: number;
    selected: boolean=false;
    button1Clicked: boolean=false;
    button2Clicked: boolean=false;
    button3Clicked: boolean=false;
    clicked: boolean=false;
    dateOfMatch: string;
    constructor(teams, quotation, competition, country, date,_id, score, dateOfMatch)
    {
        this.teams=teams;
        this.quotation=quotation;
        this.competition=competition;
        this.country=country;
        this.date=date;
        this._id=_id
        this.score=score
        this.dateOfMatch=dateOfMatch

    }
}