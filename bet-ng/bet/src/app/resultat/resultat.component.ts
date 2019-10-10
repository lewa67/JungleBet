import { Component, OnInit } from '@angular/core';
// import { Bet } from '../bet/bet-list/bet.model';
import { HttpClient } from '@angular/common/http';
import { BetService } from '../bet.service';
import { Bet } from '../bet/bet-list/bet.model';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  results: Bet[]=[];
  dateOfMatches:string[]=[];

  constructor(private httpClient: HttpClient, private betService: BetService) { }

  ngOnInit() {
    this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=Ligue 1`).subscribe((res:Bet[])=>{
      
      this.results=res;
      this.results=this.results.filter(match=>match.score.length>1)
      this.dateOfMatches=[]
      this.results.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
    function onlyUnique(value, index, self) {
      if(value!=undefined) {return self.indexOf(value) === index;}
      
  }
    this.dateOfMatches=this.dateOfMatches.filter(onlyUnique)
    console.log(this.dateOfMatches)

    })
  }

  sort(compet:string){
    this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=${compet}`).subscribe((res:any)=>{
      this.results=res;
      this.results=this.results.filter(match=>match.score.length>1)
      this.dateOfMatches=[]
      this.results.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
    function onlyUnique(value, index, self) {
      if(value!=undefined) {return self.indexOf(value) === index;}
      
  }
    this.dateOfMatches=this.dateOfMatches.filter(onlyUnique)
    console.log(this.dateOfMatches)
    })


  }

}
