# ✈️ Airlines Reservation System

A web-based flight booking platform that allows users to search, book, cancel, and manage airline tickets. Designed to be responsive and user-friendly for both passengers and administrators.

---

## 🎯 Objective

To develop a responsive and dynamic airline reservation system that supports user authentication, real-time seat availability, and administrative management for flights and bookings.

---

## 🧰 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Backend**: PHP (Native)
- **Database**: MySQL
- **Optional Tools**: phpMyAdmin, Ajax

---

## 👤 User Roles

- **Passenger**: Book, view, cancel flights
- **Admin**: Manage flights, bookings, and users

---

## 🔐 Core Features

### 🔹 Passenger Module

- User Registration & Login
- Flight Search (origin, destination, date)
- Real-time Seat Availability
- Booking Confirmation & Cancellation
- Booking History Dashboard
- Download/Print Booking Details (PDF or Modal)
- Mobile-Responsive Design

### 🔹 Admin Module

- Admin Authentication
- Add/Update/Delete Flights
- View All Bookings & Registered Users
- Manage Seat Map (optional)

---

## 💡 Optional Features

- Clickable Seat Map UI
- Flight Filters (Non-stop, Time Window)
- Email Booking Confirmation
- Booking Timeline Modal / Receipt View

---

## 🗃️ Database Schema

### `users`
| Field       | Type           | Description               |
|-------------|----------------|---------------------------|
| id          | INT (PK)       | Unique user ID            |
| username    | VARCHAR(50)    | Name of user              |
| email       | VARCHAR(100)   | Unique email address      |
| password    | VARCHAR(255)   | Hashed password           |
| created_at  | TIMESTAMP      | Account creation date     |

### `flights`
| Field           | Type           | Description                  |
|------------------|----------------|------------------------------|
| id               | INT (PK)       | Unique flight ID             |
| flight_number    | VARCHAR(20)    | Unique flight code           |
| origin           | VARCHAR(100)   | Departure city               |
| destination      | VARCHAR(100)   | Arrival city                 |
| departure_time   | DATETIME       | Flight departure time        |
| available_seats  | INT            | Remaining seats              |

### `reservations`
| Field       | Type           | Description                   |
|-------------|----------------|-------------------------------|
| id          | INT (PK)       | Unique booking ID             |
| user_id     | INT (FK)       | Linked to `users(id)`         |
| flight_id   | INT (FK)       | Linked to `flights(id)`       |
| reserved_at | TIMESTAMP      | Time of booking               |

---

## 🚀 How to Run Locally

1. Clone this repository
2. Import `schema.sql` in phpMyAdmin
3. Configure `config/db.php` with your MySQL credentials
4. Serve the project via XAMPP/Laragon/MAMP

---

## 📸 Screenshots

Add screenshots of:
- Homepage
- Booking Form
- Admin Dashboard
- Booking History

---

## 🌐 Live Demo

_Optional – add hosted demo link if available_

---

## 📂 Folder Structure

- `/public` – Public-facing HTML, CSS, JS
- `/backend/api` – PHP APIs for bookings, flights, users
- `/backend/auth` – User and admin auth logic
- `/backend/config` – DB connection and constants
- `/backend/database` – SQL schema and seeders

---

## 🪪 License

This project is under the **Non-Commercial Use Only** license. You may clone, modify, and use it for personal or academic purposes, but **not** for commercial redistribution or deployment.

---

## 🙋‍♀️ Questions or Feedback?

Feel free to reach out or create an issue in the repository!
