# Project Schema Documentation

This document outlines the database schema for the Keysight Flight Project to assist with data uploading and integration.

## Database Overview
- **Database Type**: MySQL
- **Schema Update Strategy**: `update` (Hibernate automatically updates schema on startup)
- **Database Name**: `db_world` (as per `application.properties`)

## Entities

### 1. User (`users` table)
Stores user account information.

| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | PK, Auto Increment | Unique identifier for the user |
| `username` | Varchar | - | User's display name |
| `email` | Varchar | - | User's email address |
| `password` | Varchar | - | User's password |

### 2. Flight (`flight` table)
Stores available flight details.

| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | PK, Auto Increment | Unique identifier for the flight |
| `flight_name` | Varchar(100) | **NOT NULL** | Name of the flight (e.g., flight number) |
| `source` | Varchar(100) | **NOT NULL** | Origin airport code or city |
| `destination` | Varchar(100) | **NOT NULL** | Destination airport code or city |
| `price` | Double | **NOT NULL** | Cost of the flight |
| `distance` | Integer | - | Distance in miles/km |
| `carrier` | Varchar | - | Airline carrier code |
| `tailnum` | Varchar | - | Aircraft tail number |
| `dep_time` | Varchar | - | Departure time |
| `arr_time` | Varchar | - | Arrival time |
| `air_time` | Varchar | - | Duration of the flight |

> [!IMPORTANT]
> The `price`, `source`, `destination`, and `flight_name` fields are **MANDATORY** (Not Null). Any data upload script must ensure these values are present.
>
> **Note on `flights.csv`**: The existing `flights.csv` in resources does **not** contain a `price` column. If you are using this CSV to populate the database, you must **add a `price` column** or generate it programmatically during upload.

### 3. Booking (`booking` table)
Stores flight reservations made by users.

| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | PK, Auto Increment | Unique identifier for the booking |
| `user_id` | BigInt | FK, **NOT NULL** | Reference to `users.id` |
| `flight_id` | BigInt | FK, **NOT NULL** | Reference to `flight.id` |
| `bookingDate` | Date | - | Date of booking |
| `passengerName` | Varchar | - | Name of the passenger |
| `passengerAge` | Integer | - | Age of the passenger |
| `passengerPhoneNumber`| Varchar | - | Contact number |
| `passengerAadhaar` | Varchar | - | Aadhaar card number |
| `passengerPan` | Varchar | - | PAN card number |

## Relationships
- **User** 1 : N **Booking** (One user can have many bookings)
- **Flight** 1 : N **Booking** (One flight can have many bookings)

## Data Upload Checklist
If manually uploading data (e.g., via SQL or CSV script):
1. **Users**: Create users first or ensure valid `user_id`s exist.
2. **Flights**: Ensure `price`, `source`, `destination`, and `flightName` are populated.
3. **Bookings**: Require valid `user_id` and `flight_id` that already exist in their respective tables.
