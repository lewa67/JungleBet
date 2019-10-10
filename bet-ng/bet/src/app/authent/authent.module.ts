import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/reducer';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { RegisterComponent } from '../register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './login/auth.effect';




@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth',authReducer),
    EffectsModule.forFeature([AuthEffects])
    
  ],
  exports: [ AuthenticationComponent,LoginComponent]
})
export class AuthentModule { }
