package com.example.demo.component;

import com.example.demo.model.Flight;
import com.example.demo.repository.flightrepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final flightrepository flightRepository;

    public DataSeeder(flightrepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (flightRepository.count() == 0) {
            System.out.println("Seeding database from flights.csv...");
            loadCsvData();
        }
    }

    private void loadCsvData() {
        try {
            ClassPathResource resource = new ClassPathResource("flights.csv");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            String line;
            List<Flight> flights = new ArrayList<>();
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                // Simple CSV parsing (assuming no commas in fields for this dataset)
                String[] data = line.split(",");

                // Ensure we have enough columns (header has 21 columns)
                if (data.length < 21)
                    continue;

                try {
                    // Extract data using indices found in flights.csv check
                    // 4: dep_time, 7: arr_time, 10: carrier, 12: tailnum, 13: origin, 14: dest, 15:
                    // air_time, 16: distance, 20: name
                    String depTime = data[4];
                    String arrTime = data[7];
                    String carrier = data[10];
                    String tailnum = data[12];
                    String source = data[13];
                    String destination = data[14];
                    String airTime = data[15];
                    String distanceStr = data[16];
                    String flightName = data[20]; // Use airline name for flight name

                    // Parse numeric values safely
                    // Some fields might be "NA" or empty in real CSVs, handle basic cases
                    Integer distance = 0;
                    try {
                        distance = (int) Double.parseDouble(distanceStr);
                    } catch (NumberFormatException e) {
                        distance = 0;
                    }

                    Double price = distance * 2.0;

                    Flight flight = new Flight();
                    flight.setFlightName(flightName);
                    flight.setSource(source);
                    flight.setDestination(destination);
                    flight.setPrice(price);
                    flight.setDistance(distance);
                    flight.setCarrier(carrier);
                    flight.setTailnum(tailnum);
                    flight.setDepTime(depTime);
                    flight.setArrTime(arrTime);
                    flight.setAirTime(airTime);

                    flights.add(flight);
                } catch (Exception e) {
                    // Skip malformed lines
                    System.out.println("Skipping line due to error: " + e.getMessage());
                }
                if (flights.size() >= 100) {
                    System.out.println("Limit reached: seeding only 100 flights for performance testing.");
                    break;
                }
            }

            // Save all flights
            if (!flights.isEmpty()) {
                flightRepository.saveAll(flights);
                System.out.println("Flights seeded successfully: " + flights.size());
            }

            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
