import { Component, OnInit } from '@angular/core';
// import { Bet } from '../bet/bet-list/bet.model';
import { HttpClient } from '@angular/common/http';
import { BetService } from '../bet.service';
import { Bet } from '../bet/bet-list/bet.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../authent/reducers/reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  results: Bet[]=[];
  dateOfMatches:string[]=[];
  competi="Ligue 1";
  months: string[]=["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]


  constructor(private httpClient: HttpClient, private betService: BetService,private store: Store<AuthState>, private router: Router) { }

  ngOnInit() {

    this.store.subscribe(state=>{
      if(state["auth"].user==undefined){
        this.router.navigate(["/403"])
      }
      
    })
  
    this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=Ligue 1`).subscribe((res:Bet[])=>{
      
      this.results=res;
      this.results=this.results.filter(match=>match.score.length>1)
      this.dateOfMatches=[]
      this.results.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
    function onlyUnique(value, index, self) {
      if(value!=undefined) {return self.indexOf(value) === index;}
      
  }

  this.store.subscribe(state=>{
    if(state["auth"].user==undefined){
      this.router.navigate(["/403"])
    }
    
  })
    this.dateOfMatches=this.dateOfMatches.filter(onlyUnique).sort((a,b)=>{
      let aTab=a.split(" ");
      let bTab=b.split(" ");
      console.log(aTab,bTab)
      console.log(aTab[2],bTab[2])
      if(aTab[2]!=bTab[2]){
        console.log("Mois",this.months.indexOf(aTab[2]),this.months.indexOf(bTab[2]))
      return   this.months.indexOf(aTab[2])-this.months.indexOf(bTab[2])
      }else {
        console.log("Jour",parseInt(aTab[1]),parseInt(bTab[1]))
        return parseInt(aTab[1])-parseInt(bTab[1])
      }
    }).reverse()
    console.log(this.dateOfMatches)

    })
  }

  sort(compet:string){
    this.competi=compet
    this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=${compet}`).subscribe((res:any)=>{
      this.results=res;
      this.results=this.results.filter(match=>match.score.length>1)
      this.dateOfMatches=[]
      this.results.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
    function onlyUnique(value, index, self) {
      if(value!=undefined) {return self.indexOf(value) === index;}
      
  }
    this.dateOfMatches=this.dateOfMatches.filter(onlyUnique).sort((a,b)=>{
      let aTab=a.split(" ");
      let bTab=b.split(" ");
      console.log(aTab,bTab)
      console.log(aTab[2],bTab[2])
      if(aTab[2]!=bTab[2]){
        console.log("Mois",this.months.indexOf(aTab[2]),this.months.indexOf(bTab[2]))
      return   this.months.indexOf(aTab[2])-this.months.indexOf(bTab[2])
      }else {
        console.log("Jour",parseInt(aTab[1]),parseInt(bTab[1]))
        return parseInt(aTab[1])-parseInt(bTab[1])
      }
    }).reverse()
    console.log(this.dateOfMatches)
    })


  }

}
