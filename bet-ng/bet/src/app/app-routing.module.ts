import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BetListComponent } from './bet/bet-list/bet-list.component';
// import { AuthenticationComponent } from './authent/authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
// import { LoginComponent } from './authent/login/login.component';
// import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-guard.service';
import { AdminGuard } from './admin-guard.service';
import { ActualiteComponent } from './actualite/actualite.component';
// import { UserManagementComponent } from './user-management/user-management.component';
// import { UserInfoComponent } from './user-info/user-info.component';
import { ResultatComponent } from './resultat/resultat.component';
import { BetResolver } from './bet/bet-list/bet.resolver';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthenticationComponent } from './authent/authentication/authentication.component';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
// import { BetResolver } from './bet/bet-list/bet.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'bet', pathMatch: 'full' },
  {path: 'bet', component: BetListComponent, resolve:{bets: BetResolver}},
  {path: 'auth/:action', component: AuthenticationComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'actualite', component: ActualiteComponent},
  {path: 'usermgmt', component: UserManagementComponent},
  {path: 'userInfo/:username', component: UserInfoComponent},
  {path: 'actualite/:articleId', component: ActualiteComponent},
  {path: 'resultat', component: ResultatComponent},
  {path: '403', component: NotAuthorizedComponent},
  { path: '**', redirectTo: '404', pathMatch: 'full' },
  {path: '404', component: NotFoundComponent}
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
