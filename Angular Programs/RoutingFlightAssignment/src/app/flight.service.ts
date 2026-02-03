import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights = [
    { id: 101, flightNo: 'AI-101' },
    { id: 202, flightNo: 'AI-202' }
  ];

  getFlights() {
    return this.flights;
  }

  addFlight(flight: any) {
    this.flights.push(flight);
  }
}
