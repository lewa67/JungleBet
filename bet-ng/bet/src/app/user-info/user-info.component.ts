import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../bet/bet-list/bet.model';
import { BetHistory } from './betHistory.model';
import { Result } from '../resultat/resultat.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username:string;
  user: User;
  betsInHistory:BetHistory[]=[];
  betwinner: string[];
  results: Result[];
  roles: string[]=[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
    this.username=params["username"]
    })
    this.http.post(`http://localhost:3000/api/v1/roles`,{username:this.authService.getUser()}).subscribe((role: string[])=>{this.roles=role
    console.log(this.roles) 
  })
    this.http.get(`http://localhost:3000/api/v1/user?username=${this.username}`).subscribe((user:User)=>{
      console.log(user)
      this.user=user;
      console.log(this.user)    
      this.results=this.user.betsHistory.results
      this.betwinner=this.user.betsHistory.map(history=>history.bets.map(bet=>{if(bet.winner=="Match Nul"){
        return `Match Nul(${bet.teams[0]}-${bet.teams[1]})`
      }else return bet.winner}))
      console.log(this.betwinner)
      // this.betsInHistory=this.user.betsHistory.bets;
      // console.log(this.betsInHistory)
      // this.betwinner=this.betsInHistory.map(bet=>bet.winner)
      // console.log(this.betwinner)
    })
  }

  isARole(role:string){

   return this.user.roles.includes(role)

  }

  addRole(userName,rOle){
    this.http.post(`http://localhost:3000/api/v1/addRole`,{username:userName,role:rOle}).subscribe(el=>this.http.get(`http://localhost:3000/api/v1/user?username=${this.username}`).subscribe((user:User)=>{
      this.user=user
    }))
  }
  deleteRole(userName,rOle){
    this.http.post(`http://localhost:3000/api/v1/deleteRole`,{username:userName,role:rOle}).subscribe(el=>this.http.get(`http://localhost:3000/api/v1/user?username=${this.username}`).subscribe((user:User)=>{
      this.user=user
    }))
  }

  print(match:any){
    console.log(match)
  }
}
