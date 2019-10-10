import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetListComponent } from './bet-list/bet-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { BetDataService } from './bet-list/bet.data-service';
import { Bet } from './bet-list/bet.model';

const appEntityMetadata: EntityMetadataMap = {
  Bets: {selectId: (bet: Bet) => bet._id},
};


@NgModule({
  declarations: [BetListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    RouterModule,
    ReactiveFormsModule,
    
   
  ],
  exports:[BetListComponent]
})
export class BetModule {
  
  constructor( eds: EntityDataService, betDataService: BetDataService, entityDefSer: EntityDefinitionService){
    entityDefSer.registerMetadataMap(appEntityMetadata)
    eds.registerService("Bets",betDataService)
  }

 }
