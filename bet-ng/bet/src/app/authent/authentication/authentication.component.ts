import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { User } from '../../user.model';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit {
user: User=new User("","");
links: Object[]=[{path: "/login", label:"Login"},{path: "/register", label:"Register"}]
index:number=0;

  constructor( private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params["action"]=="login"){
       this.index=0
      } else if(params["action"]=="register"){
        this.index=1
      }
    })
  }

  login(){
   console.log('user',this.user);
   this.authService.login(this.user).subscribe(data=>this.handlesuccess(data), error=> this.handleError(error))
  }
handlesuccess(data){
  console.log(data);
  this.router.navigate(["/admin"]);
  data.loggedIn=true;
}

handleError(data){
  console.log(data);
}
}
