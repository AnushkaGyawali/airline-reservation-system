# ✈️ Airline Reservation System

A full-stack airline reservation system built using **PHP**, **MySQL**, **Bootstrap**, and **JavaScript**. Users can register, log in, search flights, book and cancel tickets, and view their booking history.

---

## 📌 Features

- ✅ User Registration and Login (with password hashing)
- 🔐 Secure Session Management
- 🔍 Flight Search and Listing
- 📦 Booking and Cancellation with real-time seat updates
- 🧾 Reservation History Dashboard
- 📱 Responsive UI with Bootstrap

---

## 🧱 Tech Stack

| Layer         | Tools / Technologies         |
|---------------|------------------------------|
| Frontend      | HTML, CSS, JavaScript, Bootstrap |
| Backend       | PHP                           |
| Database      | MySQL                         |
| Communication | Fetch API / AJAX             |

---

## 🚀 Installation & Setup

### ✅ Prerequisites

- PHP 7.4+
- MySQL
- Apache or XAMPP/LAMP/MAMP

### ⚙️ Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/AnushkaGyawali/airline-reservation-system
    ```
2.  **Import the Database**
    Open phpMyAdmin or MySQL CLI.
    Create a database (e.g., `airline_db`).
    Import `schema.sql` into your database.
3.  **Configure Database**
    Update `config/db.php` with your MySQL credentials.
4.  **Start the Server**
    Use Apache or PHP built-in server:
    ```bash
    php -S localhost:8000 -t public
    ```
5.  **Open in Browser**
    Navigate to: `http://localhost:8000`

---

## 🔐 Authentication

-   **Register**: `/public/register.html`
-   **Login**: `/public/login.html`
-   Uses `password_hash()` and `password_verify()` for secure password handling.
-   Session management is handled via PHP `$_SESSION`.

---

## 🔍 Flight Search

-   A form to search flights is available on `public/index.html`.
-   Fetches available flights from `api/flights.php`.
-   Displays results with real-time seat availability.

---

## 📦 Book & Cancel Reservations

-   **Booking**: Send a `POST` request to `api/reservations.php` to book a flight.
-   **Cancellation**: Send a `DELETE` request to `api/reservations.php` with the `reservation_id` to cancel a booking.
-   Seat counts are updated in real-time to reflect availability.

---

## 🧾 My Reservations

-   View your booking history on `/public/reservations.html`.
-   This page is protected via a session check to ensure only authenticated users can view their reservations.
-   Lists all your bookings with options to cancel.

---

## 📁 Folder Structure
airline-reservation-system/
├── api/                   # API endpoints (book, cancel, fetch data)
│   ├── flights.php
│   ├── reservations.php
│   ├── user_reservations.php
│   └── check_session.php
├── assets/
│   └── js/
│       └── script.js      # Frontend logic (search, reservation)
├── auth/                  # Authentication system
│   ├── login.php
│   ├── logout.php
│   └── register.php
├── config/
│   └── db.php             # Database connection setup
├── public/                # Public HTML pages
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── reservations.html
├── README.md              # Project README file
└── schema.sql             # Database schema
## I have later on added some admin side files which can be edited according to requirements.