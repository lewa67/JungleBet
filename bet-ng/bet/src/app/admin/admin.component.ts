import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../bet/bet-list/bet.model';
// import { Bet } from '../bet/bet-list/bet.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
bets: Bet[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:3000/api/v1/bet").subscribe((res:any)=> {console.log(res);
    this.bets=res;
  }
    
    )
  }

  sort(compet:string){
    this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=${compet}`).subscribe((res:any)=>{
      this.bets=res;
    })


  }
  delete(bet:Bet){
    this.httpClient.delete(`http://localhost:3000/api/v1/bet?teams=${bet.teams[0]}`).subscribe((res:any)=> {console.log(res);
    this.httpClient.get("http://localhost:3000/api/v1/bet").subscribe((res:any)=> {console.log(res);
    this.bets=res;
  }
    
    )
  })
}
}
