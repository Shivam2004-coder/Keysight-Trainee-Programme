import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  flights: any[] = [];

  constructor(private flightService: FlightService) {
    this.flights = this.flightService.getFlights();
  }
}
