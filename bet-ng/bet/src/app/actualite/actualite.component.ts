import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
  
  articleId:number;
  articles:Article[];
  loading: boolean=false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     
     this.route.params.subscribe(params=>{
      this.articleId= params["articleId"]
     })   
      this.http.get<Article[]>("http://localhost:3000/api/v1/articles").subscribe(el=>{
      this.loading=true;
      console.log("Loader",this.loading)  
      this.articles=el.splice(0,20).filter(article=>article.image!=undefined)
      

    })
  }


  navigate(){
    this.router.navigate(["/actualite"])
  }
  
  scroll(){
    if(window.innerWidth<750){
      console.log("scroll")
      window.scroll(0,1450)
    }
  }

  

}
