package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "flight")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment in MySQL
    private Long id;

    @Column(name = "flight_name", nullable = false, length = 100)
    private String flightName;

    @Column(nullable = false, length = 100)
    private String source;

    @Column(nullable = false, length = 100)
    private String destination;

    @Column(nullable = false)
    private Double price;

    @Column(name = "distance")
    private Integer distance;

    @Column(name = "carrier")
    private String carrier;

    @Column(name = "tailnum")
    private String tailnum;

    @Column(name = "dep_time")
    private String depTime;

    @Column(name = "arr_time")
    private String arrTime;

    @Column(name = "air_time")
    private String airTime;

    public Flight() {
    }

    public Flight(String flightName, String source, String destination, Double price, Integer distance, String carrier,
            String tailnum, String depTime, String arrTime, String airTime) {
        this.flightName = flightName;
        this.source = source;
        this.destination = destination;
        this.price = price;
        this.distance = distance;
        this.carrier = carrier;
        this.tailnum = tailnum;
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.airTime = airTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightName() {
        return flightName;
    }

    public void setFlightName(String flightName) {
        this.flightName = flightName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public String getCarrier() {
        return carrier;
    }

    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }

    public String getTailnum() {
        return tailnum;
    }

    public void setTailnum(String tailnum) {
        this.tailnum = tailnum;
    }

    public String getDepTime() {
        return depTime;
    }

    public void setDepTime(String depTime) {
        this.depTime = depTime;
    }

    public String getArrTime() {
        return arrTime;
    }

    public void setArrTime(String arrTime) {
        this.arrTime = arrTime;
    }

    public String getAirTime() {
        return airTime;
    }

    public void setAirTime(String airTime) {
        this.airTime = airTime;
    }
}
