rp=require('request-promise')
const Bets = require('../api/model/bets');
const Bet= Bets[0];
cheerio=require('cheerio')
scrapperWinamax=(async ()=>{

    // await Bet.collection.drop()
    countries=[{"country":"France","matchs":[],"competition":"Ligue 1"},{"country":"Spain","matchs":[],"competition":"Liga"},{"country":"Italy","matchs":[],"competition":"Serie A"},{"country":"Germany","matchs":[],"competition":"Bundesliga"},{"country":"England","matchs":[],"competition":"Premier League"}]
    for(let compet of countries){
    team1="";
    team2="";
    date="";
    country="";
    competition="";
    quotation=[];
    let bet;

    let $=cheerio.load( await rp({uri: `http://www.soccer-rating.com/${compet.country}/`}))
    console.log("en cours...")
    $("#oddsa > table > tbody > tr").each( async function(i,el){
      console.log(i)
    //   if($(this).children(".teamh > a").text())
      if($(this).children(".teamh").children("a").html()==null && $(this).children("td").first().text().slice(0,-1).length>2){
       compet.matchs[i]=($(this).children(".teamh").children("b").children("a").text()+"-"+$(this).children(".team").children("a").text()+"  date:"+$(this).children("td").first().text().slice(0,-1)+`  Pays:${compet.country}`+"  " +$(this).children(".team").next().text()+" - "+$(this).children(".team").next().next().text()+" - "+$(this).children(".team").next().next().next().text())
      team1=$(this).children(".teamh").children("b").children("a").text();
      team2=$(this).children(".team").children("a").text()
      date=$(this).children("td").first().text().slice(0,-1)
      country=compet.country;
      competition=compet.competition;
      quotation=[+$(this).children(".team").next().text(),+$(this).children(".team").next().next().text(),+$(this).children(".team").next().next().next().text()]
      bet=new Bet({teams:[team1,team2],country:country,competition:competition,quotation:quotation,dateOfMatch:date})
     await bet.save();
      }else if($(this).children("td").first().text().slice(0,-1).length>2){
      team1=$(this).children(".teamh").children("a").text()
      team2=$(this).children(".team").children("b").children("a").text()
      date=$(this).children("td").first().text().slice(0,-1)
      country=compet.country;
      competition=compet.competition;
      quotation=[+$(this).children(".team").next().text(),+$(this).children(".team").next().next().text(),+$(this).children(".team").next().next().next().text()]
      bet=new Bet({teams:[team1,team2],country:country,competition:competition,quotation:quotation,dateOfMatch:date})
      await bet.save()
     compet.matchs[i]=($(this).children(".teamh").children("a").text()+"-"+$(this).children(".team").children("b").children("a").text()+"  date:"+$(this).children("td").first().text().slice(0,-1)+`  Pays:${compet.country}` + " "+$(this).children(".team").next().text()+" - "+$(this).children(".team").next().next().text()+" - "+$(this).children(".team").next().next().next().text())
      }
  
     
    //   if($(this).children(".team").children("a").html()==null){
    //     teams2[i]=$(this).children(".team").children("b").children("a").text()
    //    }else{
    //      teams2[i]=$(this).children(".team").children("a").text()
    //    }


    })
    compet.matchs=compet.matchs.filter(match=>{
        return match.length>6
    })
    // console.log(compet.matchs)
}
    

    // console.log(teams)
    console.log("terminé")
})


module.exports=scrapperWinamax;

