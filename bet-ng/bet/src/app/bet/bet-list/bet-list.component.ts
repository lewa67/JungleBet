import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet } from './bet.model';
import { BetService } from '../../bet.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BetEntityService } from './bet.entity-service';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/authent/reducers/reducer';


@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.css'],
  providers: [BetService]
})
export class BetListComponent implements OnInit {
  
  bets: Bet[]=[];
  paris$: Observable<Bet[]>
  betSelected$: Observable<Bet[]>
  betSelectdSubscription: Subscription;
  betSelected: Bet[]=[];
  clicked: boolean=false;
  numberOfBetSelected: number=0;
  totalQuotation: number=1;
  gain: number=5;
  mise: any;
  pleaseLogin: boolean=false;
  pleaseNotForget: boolean=false;
  ticketSaved: boolean=false;
  dateOfMatches:string[]=[];
  compet=""
  
  constructor(private httpClient: HttpClient,private betService: BetService,private renderer: Renderer2, private authService: AuthService, private router: Router, private route:ActivatedRoute, private betEntityService: BetEntityService,private store: Store<AuthState>) { }

  ngOnInit() {

  //   this.betEntityService.entities$.subscribe(bets=>{
  //     if(bets.length<3){
  //         console.log("a NAVIGUE")
  //         this.router.navigate(["/403"])
  //     }
  // })

  this.store.subscribe(state=>{
    if(state["auth"].user==undefined){
      this.router.navigate(["/403"])
    }
    
  })


    console.log(this.betSelected.length)
   this.betEntityService.entities$.subscribe(bets=>console.log("ENTIIT",bets))
   this.paris$= this.betEntityService.entities$.pipe(map(bets=>{
    return bets.filter(match=>{
      return match.score.length==0 && match.competition=="Ligue 1"
    })
  }))
 this.paris$.subscribe(bets=>{
   console.log("BETSSS", bets)
  this.dateOfMatches=[]

      bets.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
   
    // console.log(this.dateOfMatches)
    
    function onlyUnique(value, index, self) {
      if(value!=undefined) {return self.indexOf(value) === index;}
      
  }
    this.dateOfMatches=this.dateOfMatches.filter(onlyUnique)
 })
  //   this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=Ligue 1`).subscribe((res:any)=>{
  //     this.compet="Ligue 1-France"
  //     this.bets=res;
  //     this.bets=this.bets.filter(match=>{
  //       return match.score.length==0
  //     })
  //     this.dateOfMatches=[]
  //     this.bets.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
      
  //   function onlyUnique(value, index, self) {
  //     if(value!=undefined) {return self.indexOf(value) === index;}
      
  // }
  //   this.dateOfMatches=this.dateOfMatches.filter(onlyUnique)
  //   console.log(this.dateOfMatches)
  //   })
 
  this.betSelected$=this.betEntityService.entities$.pipe(map(bets=>{
    return bets.filter(bet=>{
      return bet.selected==true
    })
  })
  
  )

    this.betSelectdSubscription= this.betService.betSelected.subscribe(
      (bet:any)=>{
        if(!bet.clicked){
          this.betSelected.push(bet);
        } else {
          this.betSelected.forEach((el,index,array)=>{
            if(el==bet){
             array.splice(index,1)
            }
          })
        
        }
        

      }
    )

  }

  print(any: any,any1:any){
   console.log(any);
   console.log(any1);
  }

  sort(compet:string){
    // this.httpClient.get(`http://localhost:3000/api/v1/bet?competition=${compet}`).subscribe((res:any)=>{
    //   this.bets=res;
    //   this.bets=this.bets.filter(match=>{
    //     return match.score.length==0
    //   })
      
      
    // })
    
   this.paris$= this.betEntityService.entities$.pipe(map(bets=>{
      return bets.filter((match: Bet)=>{
        return match.score.length==0 && match.competition==compet
      })
    }))
   this.paris$.subscribe(bets=>{
    this.dateOfMatches=[]
  
        bets.forEach(bet=>this.dateOfMatches.push(bet.dateOfMatch))
     
      // console.log(this.dateOfMatches)
      
      function onlyUnique(value, index, self) {
        if(value!=undefined) {return self.indexOf(value) === index;}
        
    }
      this.dateOfMatches=this.dateOfMatches.filter(onlyUnique)
   })
    // , tap()

  
console.log("datteee",this.dateOfMatches)

  }

  getButton1(i:number){
    let button = this.renderer.selectRootElement(`#button1${i}`);
    return button;
  }

  getButton2(i:number){
    let button = this.renderer.selectRootElement(`#button2${i}`);
    return button;
  }
  
  setButton3(i:number){
    this.renderer.setProperty(this.renderer.selectRootElement(`#button3${i}`),"disabled","true");
    
  }

  betSelect1(bet:Bet,i:number){
    
    
    if(!bet.clicked){
      console.log(bet)
      // bet.winner=bet.teams[0];
      let newBet: Bet={
       ...bet,
       selected: !bet.selected,
       clicked: !bet.clicked,
       winner:bet.teams[0],
       winingbet: bet.quotation[0],
       button1Clicked: !bet.button1Clicked
       
      }
      // bet.winingbet=bet.quotation[0];
      // bet.selected=!bet.selected;
      console.log("NOTTTT CLICK")
      this.betEntityService.updateOneInCache(newBet)
     
      // this.betSelected$.subscribe(bets=>console.log(bets))
      console.log("NEWBET",newBet)
      // this.betService.betSelected.next(bet);
      // this.numberOfBetSelected++;
      this.totalQuotation=this.totalQuotation*bet.quotation[0];
     
      
      
    } else{
      let newBet: Bet={
        ...bet,
        selected: !bet.selected,
        clicked: !bet.clicked,
        button1Clicked: !bet.button1Clicked
       }
      console.log(bet.clicked)
      this.betEntityService.updateOneInCache(newBet)
      this.totalQuotation=this.totalQuotation/bet.quotation[0];
      
      console.log("CLICK")
    }
    
    console.log(this.betSelected);
    
    
    
  }

  betSelect2(bet:Bet,i:number){

    if(!bet.clicked){
      console.log(bet)
      // bet.winner=bet.teams[0];
      let newBet: Bet={
       ...bet,
       selected: !bet.selected,
       clicked: !bet.clicked,
       winner:"Match Nul",
       winingbet: bet.quotation[1],
       button2Clicked: !bet.button2Clicked
       
      }
      // bet.winingbet=bet.quotation[0];
      // bet.selected=!bet.selected;
      console.log("NOTTTT CLICK")
      this.betEntityService.updateOneInCache(newBet)
     
      // this.betSelected$.subscribe(bets=>console.log(bets))
      console.log("NEWBET",newBet)
      // this.betService.betSelected.next(bet);
      // this.numberOfBetSelected++;
      this.totalQuotation=this.totalQuotation*bet.quotation[1];
     
      
      
    } else{
      let newBet: Bet={
        ...bet,
        selected: !bet.selected,
        clicked: !bet.clicked,
        button2Clicked: !bet.button2Clicked
       }
      console.log(bet.clicked)
      this.betEntityService.updateOneInCache(newBet)
      this.totalQuotation=this.totalQuotation/bet.quotation[1];
      
      console.log("CLICK")
    }
    
    console.log(this.betSelected);
    
    
    // if(!bet.clicked){
    //   this.betService.betSelected.next(bet);
    
    //   bet.winner="Match Nul";
    //   bet.winingbet=bet.quotation[1];
    //   this.numberOfBetSelected++;
    //   this.totalQuotation=this.totalQuotation*bet.quotation[1];
    //   bet.selected=!bet.selected;
    // } else{
    //   console.log(bet.clicked)
    //   this.betService.betSelected.next(bet);
    //   this.numberOfBetSelected--;
    //   this.totalQuotation=this.totalQuotation/bet.quotation[1];
      
    // }
    // bet.clicked=!bet.clicked;
    // bet.button2Clicked=!bet.button2Clicked;
    // console.log(this.betSelected);

    
    
    
  }

  betSelect3(bet:Bet,i:number){

    if(!bet.clicked){
      console.log(bet)
      // bet.winner=bet.teams[0];
      let newBet: Bet={
       ...bet,
       selected: !bet.selected,
       clicked: !bet.clicked,
       winner:bet.teams[1],
       winingbet: bet.quotation[2]
       
      }
      // bet.winingbet=bet.quotation[0];
      // bet.selected=!bet.selected;
      console.log("NOTTTT CLICK")
      this.betEntityService.updateOneInCache(newBet)
     
      // this.betSelected$.subscribe(bets=>console.log(bets))
      console.log("NEWBET",newBet)
      // this.betService.betSelected.next(bet);
      // this.numberOfBetSelected++;
      this.totalQuotation=this.totalQuotation*bet.quotation[2];
     
      
      
    } else{
      let newBet: Bet={
        ...bet,
        selected: !bet.selected,
        clicked: !bet.clicked,
       }
      console.log(bet.clicked)
      this.betEntityService.updateOneInCache(newBet)
      this.totalQuotation=this.totalQuotation/bet.quotation[2];
      
      console.log("CLICK")
    }
    
    console.log(this.betSelected);
    
    
    // if(!bet.clicked){
    //   this.betService.betSelected.next(bet);
    
    //   bet.winner=bet.teams[1];
    //   bet.winingbet=bet.quotation[2];
    //   this.numberOfBetSelected++;
    //   this.totalQuotation=this.totalQuotation*bet.quotation[2];
    //   bet.selected=!bet.selected;
    // } else{
    //   this.betService.betSelected.next(bet);
    //   this.numberOfBetSelected--;
    //   this.totalQuotation=this.totalQuotation/bet.quotation[2];
      
    // }
    // bet.clicked=!bet.clicked;
    // bet.button3Clicked=!bet.button3Clicked;
  
    
    
    
  }
  

  registerBet(){
    this.betSelected$.subscribe(bets=>{
      if(bets.length>0 && this.mise!=0){
        let winners=this.betSelected.map(bet=>{
          return bet.winner
       })
       let winingbets=this.betSelected.map(bet=>{
        return  bet.winingbet
       })
       
       this.httpClient.post(`http://localhost:3000/api/v1/betHistory?username=${this.authService.getUser()}`,{bets:this.betSelected,totalQuotation: this.totalQuotation.toFixed(2),miseTotale: this.mise, totalGain:(this.mise*this.totalQuotation).toFixed(2),winners:winners,winingbets:winingbets}).subscribe(user=>{
       this.ticketSaved=true;
       setTimeout(()=>{this.ticketSaved=false;
       location.reload()},3000)
       console.log(winners)})
      }
      else if(!(!!this.authService.getToken())){
        this.pleaseLogin=true;
      } else {
  this.pleaseNotForget=true;
      }
    })
    
  }

  removeBet(bet:Bet){

    let newBet:Bet={
      ...bet,
      selected: false,
      clicked: false,
      button1Clicked: false,
      button2Clicked: false,
      button3Clicked: false
    }
    this.betEntityService.updateOneInCache(newBet)
    this.totalQuotation=this.totalQuotation/bet.winingbet;
    bet.clicked=!bet.clicked;
   
  }

}
