import { Component } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html'
})
export class AddFlightComponent {

  id!: number;
  flightNo!: string;

  constructor(private flightService: FlightService) {}

  addFlight() {
    this.flightService.addFlight({
      id: this.id,
      flightNo: this.flightNo
    });

    this.id = 0;
    this.flightNo = '';
  }
}
