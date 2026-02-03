package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.Flight;
import com.example.demo.model.User;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private flightService flightService; // Assuming lowercase class name based on previous files

    public Booking createBooking(Long userId, Long flightId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Flight> flightOpt = flightService.getById(flightId);

        if (userOpt.isPresent() && flightOpt.isPresent()) {
            Booking booking = new Booking();
            booking.setUser(userOpt.get());
            booking.setFlight(flightOpt.get());
            booking.setBookingDate(LocalDate.now());
            return bookingRepository.save(booking);
        }
        throw new RuntimeException("User or Flight not found");
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void cancelBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
