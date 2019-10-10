import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
  
  articleId:number;
  articles:Article[];
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
     
     this.route.params.subscribe(params=>{
      this.articleId= params["articleId"]
     })   
      this.http.get<Article[]>("http://localhost:3000/api/v1/articles").subscribe(el=>{this.articles=el.splice(0,20).filter(article=>article.image!=undefined)
  

    })
  }

  

  

}
