rp=require('request-promise')
const Bets = require('../api/model/bets');
const User=require('../auth/model/user')
const Bet= Bets[0];
cheerio=require('cheerio')
scrapperScore=(async ()=>{
    countries=[{"country":"france","matchs":[],"competition":"Ligue 1",link: "france/ligue-1/"},{"country":"espagne","matchs":[],"competition":"Liga",link: "espagne/primera-division/"},{"country":"italie","matchs":[],"competition":"Serie A",link:"italie/serie-a/"},{"country":"allemagne","matchs":[],"competition":"Bundesliga",link:"allemagne/bundesliga-1/"},{"country":"angleterre","matchs":[],"competition":"Premier League",link:"angleterre/barclays-premiership-premier-league/"},{"country":"Europe","matchs":[],"competition":"Champions League",link:"europe/ligue-des-champions-uefa/"},{"country":"Europe","matchs":[],"competition":"Qualifs EURO",link:"europe/ec-qualification/"}]
    let hrefs=[]
    for(let compet of countries){
        team1="";
        team2="";
        date="";
        country="";
        competition="";
        quotation=[];
        let bet;
    $=cheerio.load(await rp(`https://www.matchendirect.fr/${compet.link}/`))

    $("div[class='panel panel-info']").first().find("tbody").each(function(i,el){
    //  console.log(i)
   
 
     $(this).find("tr").each(async function(ii,elem){
        
         if($(this).find(".lm2.lm2_0").text().includes("Termi")){
            // console.log($(this).find(".lm3_eq1").text()+"   "+ $(this).find(".lm3_eq2").text()+"  "+$(this).find(".lm3_score").text())
            // console.log($(this).find(".lm3_score").text().split("-")[0])
            Bet.findOne({teams:[$(this).find(".lm3_eq1").text(),$(this).find(".lm3_eq2").text()]})
            .exec()
            .then(bet=>{
                if(bet!=null){
                    bet.score=[+$(this).find(".lm3_score").text().split("-")[0],+$(this).find(".lm3_score").text().split("-")[1]]
                    if(bet.score[0]>bet.score[1]){
                        bet.result=bet.teams[0]
                    } else if (bet.score[0]<bet.score[1]){
                        bet.result=bet.teams[1]
                    } else 
                    {bet.result="Match Nul"}
    
                    bet.save();

                    User.find()
                    .exec()
                    .then(users=>{
                        
                        users.forEach(user=>{
                            if(user.betsHistory.length>0){
                                user.betsHistory.forEach(ticket=>{
                                    ticket.results.forEach(result=>{
                                        console.log(bet._id+"--------------"+result.bet._id)
                                        console.log()
                                        if(String(bet._id)==String(result.bet._id)){
                                            console.log("HICHHHAM")
                                           result.score=bet.score
                                           result.bet.score=bet.score
                                           result.finalWinner=bet.result
                                           result.isBetWin= result.finalWinner==result.winner? true:false
                                        }
                                    })

                                   if(ticket.results.map(result=> {return result.isBetWin}).includes(false)){
                                       ticket.isTicketWin=false
                                   } else if(ticket.results.map(result=> {return result.isBetWin}).length==ticket.results.map(result=> {return result.isBetWin}).filter(isBetWin=>{
                                       return isBetWin==true
                                   }).length) {
                                       ticket.isTicketWin=true
                                   }
                                })
                                user.save()
                            }
                            
                            // user.save()
                        })
                    })
                }
                
            })
            
         } else if($(this).find(".lm2.lm2_0").text().includes("Pariez")){

            Bet.findOne({teams:[$(this).find(".lm3_eq1").text(),$(this).find(".lm3_eq2").text()]})
            .exec()
            .then(async bet=>{
                 if (bet==null){
                    let href=""
                    href=$(this).find(".lm2.lm2_0 > a").attr("href")
                    hrefs.push($(this).find(".lm2.lm2_0 > a").attr("href"))

                    let quotation=[]
                   $$=cheerio.load(await rp(`https://www.matchendirect.fr${href}`))
                   $$("#tableau_comparateur").find("tbody").first().html()
                   quotation[0]=+$$("#tableau_comparateur").find("tbody").find("tr").first().find("td").next().next().next().html()
                   quotation[1]=+$$("#tableau_comparateur").find("tbody").find("tr").first().find("td").next().next().next().next().html()
                   quotation[2]=+$$("#tableau_comparateur").find("tbody").find("tr").first().find("td").next().next().next().next().next().html()
                   team1=$(this).find(".lm3_eq1").text()
                   team2=$(this).find(".lm3_eq2").text()
                   date=$(el).prev().text().trim()
                   country=compet.country
                   competition=compet.competition
                   bet=new Bet({teams:[team1,team2],country:country,competition:competition,quotation:quotation,dateOfMatch:date})
                   bet.save();
                   console.log(href,$(el).prev().text())
                   console.log(quotation)
                }
                
            })
          
             
                    
            // $$=cheerio.load(await rp(`https://www.matchendirect.fr/espagne/${href}`))

         }
     })
    })
}

    console.log(hrefs)
// Bet.findOne({teams:["Strasbourg","Montpellier"]})
// .exec()
// .then(bet=>{
//     console.log(bet)
//     if(bet!=null){
//         bet.score=[3,0]
//         if(bet.score[0]>bet.score[1]){
//             bet.result=bet.teams[0]
//         } else if (bet.score[0]<bet.score[1]){
//             bet.result=bet.teams[1]
//         } else 
//         {bet.result="Match Nul"}

//         bet.save();

//         User.find()
//         .exec()
//         .then(users=>{
            
//             users.forEach(user=>{
//                 if(user.betsHistory.length>0){
//                     user.betsHistory.forEach(ticket=>{
//                         ticket.results.forEach(result=>{
//                             console.log(bet._id+"--------------"+result.bet._id)
//                             console.log()
//                             if(String(bet._id)==String(result.bet._id)){
//                                 console.log("HICHHHAM")
//                                result.score=bet.score
//                                result.bet.score=bet.score
//                                result.finalWinner=bet.result
                               
//                             }
//                         })
//                     })
//                     user.save()
//                 }
                
//                 // user.save()
//             })
//         })
//     }
    
// })

})
module.exports=scrapperScore;



