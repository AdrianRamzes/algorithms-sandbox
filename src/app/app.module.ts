import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TspComponent } from './tsp/tsp.component';
import { NearestNeighbourComponent } from './tsp/nearest-neighbour/nearest-neighbour.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LogisticMapComponent } from './logistic-map/logistic-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TspComponent,
    NearestNeighbourComponent,
    LogisticMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
