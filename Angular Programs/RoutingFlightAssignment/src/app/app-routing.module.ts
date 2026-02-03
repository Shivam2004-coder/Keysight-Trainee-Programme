import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { AdminComponent } from './admin/admin.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightDetailsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'manage-flights', component: ManageFlightsComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
