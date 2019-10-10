cheerio=require('cheerio');
request=require('request');
rp=require('request-promise');
Articles=require('../api/model/article');





scrapper=(async ()=>{
    // await Articles.collection.drop()
let hrefs=[];
$$=cheerio.load(await rp("http://www.topmercato.com/207049,1/juventus---l-etonnante-revelation-d-alex-sandro-sur-son-train-de-vie.html"))
console.log($$)
href=$$("#tab-actu > ul > li").each(function(i,el){
    hrefs[i]=$$(this).children('h3').children('a').attr("href")
})

hrefs.shift()
urls=hrefs.map(el=>`http://www.topmercato.com/${el}`)

// let articles=[];

for(let url of urls  ){
    let response= await rp({uri:url})
    // headers:{
    //     "Host": "www.topmercato.com",
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0",
    //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    //     "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
    //     "Accept-Encoding": "gzip, deflate",
    //     "Referer": "http://www.topmercato.com/207046,1/barca---ter-stegen-se-prononce-sur-l-avenir-de-messi.html",
    //     "Connection": "keep-alive",
    //     "Cookie": "_ga=GA1.2.1779571790.1543662247; trc_cookie_storage=taboola%2520global%253Auser-id%3D28a65762-d49a-4600-9bb8-53d5b75ebd48-tuct302d31c; pixi_birthdate=1543662249084; __qca=P0-1593846024-1543662264428; PHPSESSID=msdjg8c30itdb0tqsb32jd65m5; eplayer=son_OFF; _gid=GA1.2.1879807089.1568346383; cookie_notice_accepted=true",
    //     "Upgrade-Insecure-Requests": "1",
    //     "Cache-Control": "max-age=0"
    // }




let $= cheerio.load(response)


title=$("div[class='article'] > h1").text();
textUnderTitle=$("div[class='article-content'] > b").text()
image=$("div[class='aligncenter'] > img").attr("src")
textUnderImage=$("div[class='article-infos']").prev().text().split("\n").filter(el=>{
    
    return el.trim() !="";
});


textUnderImage.shift();
text=textUnderImage.join("\n")

// article=new Articles({title,textUnderTitle,image,text})
// await article.save()

article= new Articles({title:title, textUnderTitle: textUnderTitle, image:image, textUnderImage: text})
article.save();
// console.log(articles)

}

// articles.forEach(async el=> await el.save())

console.log("FINISH saved articles")

// console.log(title)
// console.log(image)
// console.log(textUnderTitle)
// console.log(text)
// console.log(articles)
// return articles
})



// scrapper();
module.exports=scrapper;


