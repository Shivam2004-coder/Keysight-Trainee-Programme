import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html'
})
export class FlightDetailsComponent implements OnInit {
  flightId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('id');
  }
}
