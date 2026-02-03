import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights = [
    { number: 'AI101', from: 'Delhi', to: 'Mumbai', time: '10:00', status: 'On Time' },
    { number: 'AI202', from: 'Pune', to: 'Chennai', time: '12:30', status: 'Delayed' },
    { number: 'AI303', from: 'Bangalore', to: 'Kolkata', time: '15:00', status: 'Cancelled' }
  ];

  getFlights() {
    return this.flights;
  }
}
