import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon'; 
import { BetService } from './bet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authent/authentication/authentication.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './auth.service';

import { LoginComponent } from './authent/login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './tokenInterceptor.interceptor';
import { ProviderAst } from '@angular/compiler';
import { AuthGuard } from './auth-guard.service';
import { AdminGuard } from './admin-guard.service';
import { BlogComponent } from './blog/blog.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ResultatComponent } from './resultat/resultat.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {authReducer}  from './authent/reducers/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './authent/login/auth.effect';
import { EntityDataModule, EntityDataService, EntityDefinition, EntityDefinitionService, DefaultDataServiceConfig } from '@ngrx/data';
import { appEntityMetadata } from './bet/bet-list/entity.metadata';
import { BetEntityService } from './bet/bet-list/bet.entity-service';
import { BetResolver } from './bet/bet-list/bet.resolver';
import { BetDataService } from './bet/bet-list/bet.data-service';
import { BetModule } from './bet/bet.module';
import { AuthentModule } from './authent/authent.module';
import { reducers } from './reducer';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: 'http://localhost:3000/api/v1/bet',
//   timeout: 3000, // request timeout
// }
// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: 'http://localhost:3000/api/v1/bet',
//   timeout: 3000, // request timeout
// }

@NgModule({
  declarations: [
    AppComponent,
    UserCreationComponent,
    AdminComponent,
    BlogComponent,
    ActualiteComponent,
    UserManagementComponent,
    UserInfoComponent,
    ResultatComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    BetModule,
    AuthentModule,
    SocketIoModule.forRoot(config),
    
    StoreModule.forRoot(reducers, {runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true
    }   }   ),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),

    
    
    
  ],

 
  
  providers: [BetService, BetEntityService,BetResolver  ,BetDataService,AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }, AuthGuard, AdminGuard,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
