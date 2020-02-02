import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TspComponent } from './tsp/tsp.component';
import { NearestNeighbourComponent } from './tsp/nearest-neighbour/nearest-neighbour.component';
import { LogisticMapComponent } from './logistic-map/logistic-map.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'logistic-map', component: LogisticMapComponent },
    { path: 'tsp', component: TspComponent },
    { path: 'tsp/nearest-neighbour', component: NearestNeighbourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}