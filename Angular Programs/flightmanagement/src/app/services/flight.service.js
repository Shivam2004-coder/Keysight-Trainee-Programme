angular.module('flightApp')
  .service('FlightService', function($http, API_URL) {

    this.getFlights = function() {
      return $http.get(API_URL);
    };

    this.addFlight = function(flight) {
      return $http.post(API_URL, flight);
    };

    this.updateFlight = function(flight) {
      return $http.put(API_URL + '/' + flight.id, flight);
    };

    this.deleteFlight = function(id) {
      return $http.delete(API_URL + '/' + id);
    };

  });
