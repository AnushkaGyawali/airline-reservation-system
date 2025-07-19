async function loadFlights() {
  const res = await fetch("../api/flights.php");
  const flights = await res.json();
  const container = document.getElementById("flights");
  container.innerHTML = "";

  flights.forEach(flight => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${flight.flight_number} - ${flight.origin} to ${flight.destination}</h3>
      <p>Departs at: ${flight.departure_time}</p>
      <p>Seats left: ${flight.available_seats}</p>
      <button onclick="bookFlight(${flight.id})">Book</button>
    `;
    container.appendChild(card);
  });
}

async function bookFlight(id) {
  const res = await fetch("../api/reservations.php", {
    method: "POST",
    body: JSON.stringify({ flight_id: id })
  });
  const result = await res.json();
  if (res.ok) {
    alert("Booking successful!");
    loadFlights();
  } else {
    alert(result.error || "Failed to book");
  }
}

async function loadReservations() {
  const res = await fetch("../api/user_reservations.php");
  const reservations = await res.json();
  const container = document.getElementById("reservations");
  container.innerHTML = "";

  reservations.forEach(r => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${r.flight_number} - ${r.origin} to ${r.destination}</h3>
      <p>Departs: ${r.departure_time}</p>
      <button onclick="cancelReservation(${r.reservation_id})">Cancel</button>
    `;
    container.appendChild(card);
  });
}

async function cancelReservation(id) {
  const res = await fetch("../api/reservations.php", {
    method: "DELETE",
    body: JSON.stringify({ reservation_id: id }),
  });
  const result = await res.json();
  if (res.ok) {
    alert("Cancelled!");
    loadReservations();
  } else {
    alert(result.error || "Error");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const auth = await fetch("../api/check_session.php");
  const status = await auth.json();
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (status.loggedIn) {
    logoutBtn.style.display = "inline";
    loginBtn?.remove();
    registerBtn?.remove();
    logoutBtn.onclick = async () => {
      await fetch("../logout.php");
      location.reload();
    };
  }
});// Flight Search Form Validation
   const searchForm = document.getElementById("searchForm");
   if (searchForm) {
     searchForm.addEventListener("submit", function (e) {
       const origin = document.getElementById("origin").value.trim();
       const destination = document.getElementById("destination").value.trim();

       if (!origin || !destination) {
         alert("Both origin and destination must be filled.");
         e.preventDefault();
       }
     });
   }

