package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    private LocalDate bookingDate;

    private String passengerName;
    private Integer passengerAge;
    private String passengerPhoneNumber;
    private String passengerAadhaar;
    private String passengerPan;

    public Booking() {
    }

    public Booking(User user, Flight flight, LocalDate bookingDate, String passengerName, Integer passengerAge,
            String passengerPhoneNumber, String passengerAadhaar, String passengerPan) {
        this.user = user;
        this.flight = flight;
        this.bookingDate = bookingDate;
        this.passengerName = passengerName;
        this.passengerAge = passengerAge;
        this.passengerPhoneNumber = passengerPhoneNumber;
        this.passengerAadhaar = passengerAadhaar;
        this.passengerPan = passengerPan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Integer getPassengerAge() {
        return passengerAge;
    }

    public void setPassengerAge(Integer passengerAge) {
        this.passengerAge = passengerAge;
    }

    public String getPassengerPhoneNumber() {
        return passengerPhoneNumber;
    }

    public void setPassengerPhoneNumber(String passengerPhoneNumber) {
        this.passengerPhoneNumber = passengerPhoneNumber;
    }

    public String getPassengerAadhaar() {
        return passengerAadhaar;
    }

    public void setPassengerAadhaar(String passengerAadhaar) {
        this.passengerAadhaar = passengerAadhaar;
    }

    public String getPassengerPan() {
        return passengerPan;
    }

    public void setPassengerPan(String passengerPan) {
        this.passengerPan = passengerPan;
    }
}
