import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TspComponent } from './tsp/tsp.component';
import { NearestNeighbourComponent } from './tsp/nearest-neighbour/nearest-neighbour.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tsp', component: TspComponent },
    { path: 'tsp/nearest-neighbour', component: NearestNeighbourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}