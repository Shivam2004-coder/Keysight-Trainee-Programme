import { Component } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html'
})
export class FlightsComponent {
  flights = [
    { id: 101, flightNo: 'AI-101' },
    { id: 202, flightNo: 'AI-202' }
  ];
}
