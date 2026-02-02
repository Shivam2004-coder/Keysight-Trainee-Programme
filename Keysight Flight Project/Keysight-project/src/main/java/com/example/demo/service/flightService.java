package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Flight;
import com.example.demo.repository.flightrepository;

@Service
public class flightService {

    private final flightrepository repo;

    public flightService(flightrepository repo) {
        this.repo = repo;
    }

    public Flight addFlight(Flight flight) {
        return repo.save(flight);
    }

    public List<Flight> getAllFlights() {
        return repo.findAll();
    }

    public Optional<Flight> getById(Long id) {
        return repo.findById(id);
    }

    public Optional<Flight> updateFlight(Long id, Flight updated) {
        return repo.findById(id).map(existing -> {
            if (updated.getFlightName() != null)  existing.setFlightName(updated.getFlightName());
            if (updated.getSource() != null)      existing.setSource(updated.getSource());
            if (updated.getDestination() != null) existing.setDestination(updated.getDestination());
            return repo.save(existing);
        });
    }

    public boolean deleteFlight(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}