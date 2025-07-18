document.addEventListener('DOMContentLoaded', () => {
    // Handle auth button display
    checkLoginStatus();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '../logout.php';
        });
    }

    // If on reservations page
    if (window.location.pathname.endsWith('reservations.html')) {
        loadUserReservations();
    }

    // If on index page
    if (window.location.pathname.endsWith('index.html')) {
        const form = document.getElementById('flightSearchForm');
        if (form) {
            form.addEventListener('submit', handleFlightSearch);
        }
    }
});

async function checkLoginStatus() {
    try {
        const res = await fetch('../api/check_session.php');
        const data = await res.json();
        const isLoggedIn = data.loggedIn;

        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline';
        } else {
            loginBtn.style.display = 'inline';
            logoutBtn.style.display = 'none';
        }
    } catch (err) {
        console.error("Could not check login status:", err);
    }
}

// 🛫 Flight search handler
async function handleFlightSearch(event) {
    event.preventDefault(); // Prevent form reload

    const origin = document.getElementById('origin').value.trim().toLowerCase();
    const destination = document.getElementById('destination').value.trim().toLowerCase();
    const tableBody = document.querySelector('#flightsTable tbody');

    try {
        const response = await fetch('../api/flights.php');
        const result = await response.json();

        if (result.status === 'success') {
            tableBody.innerHTML = '';

            const filtered = result.data.filter(flight => {
                return (
                    (!origin || flight.origin.toLowerCase().includes(origin)) &&
                    (!destination || flight.destination.toLowerCase().includes(destination))
                );
            });

            if (filtered.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7">No matching flights found.</td></tr>';
                return;
            }

            filtered.forEach(flight => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${flight.flight_number}</td>
                    <td>${flight.origin}</td>
                    <td>${flight.destination}</td>
                    <td>${new Date(flight.departure_time).toLocaleString()}</td>
                    <td>${new Date(flight.arrival_time).toLocaleString()}</td>
                    <td>${flight.available_seats}</td>
                    <td><button onclick="bookFlight(${flight.flight_id})">Book</button></td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            alert("Failed to fetch flights: " + result.message);
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while fetching flights.");
    }
}

// 🧾 Flight booking request
async function bookFlight(flightId) {
    const confirmBooking = confirm("Do you want to book this flight?");
    if (!confirmBooking) return;

    try {
        const response = await fetch('../api/reservations.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flight_id: flightId })
        });

        const result = await response.json();
        alert(result.message);

        document.getElementById('flightSearchForm').dispatchEvent(new Event('submit'));
    } catch (err) {
        console.error(err);
        alert("Error booking flight.");
    }
}

// 👇 Reservation page handler
async function loadUserReservations() {
    const tableBody = document.querySelector('#reservationsTable tbody');

    try {
        const response = await fetch('../api/user_reservations.php');
        const result = await response.json();

        if (result.status === 'success') {
            const reservations = result.data;
            tableBody.innerHTML = '';

            if (reservations.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7">No reservations found.</td></tr>';
                return;
            }

            reservations.forEach(res => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${res.flight_number}</td>
                    <td>${res.origin}</td>
                    <td>${res.destination}</td>
                    <td>${new Date(res.departure_time).toLocaleString()}</td>
                    <td>${new Date(res.arrival_time).toLocaleString()}</td>
                    <td>${new Date(res.reservation_time).toLocaleString()}</td>
                    <td><button onclick="cancelReservation(${res.reservation_id}, '${res.flight_number}')">Cancel</button></td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            alert(result.message || 'Error loading reservations.');
        }
    } catch (err) {
        console.error(err);
        alert('Failed to load reservations.');
    }
}

async function cancelReservation(reservationId, flightNumber) {
    const confirmCancel = confirm(`Are you sure you want to cancel reservation for flight ${flightNumber}?`);
    if (!confirmCancel) return;

    try {
        const response = await fetch('../api/reservations.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reservation_id: reservationId }) // Changed from flight_id to reservation_id
        });

        const result = await response.json();
        alert(result.message);
        loadUserReservations(); // Refresh the list
    } catch (err) {
        console.error(err);
        alert("Error canceling reservation.");
    }
}