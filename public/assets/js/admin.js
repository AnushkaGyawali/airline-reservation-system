const API_AIRCRAFT = '/api/admin/manage_aircraft.php';
const API_FLIGHTS  = '/api/admin/manage_flights.php';
const API_BOOKS    = '/api/admin/view_bookings.php';

document.addEventListener('DOMContentLoaded', () => {
  // Load data based on page
  // Updated to check for .php extensions
  if (location.pathname.includes('manage-aircraft.php')) initAircraft();
  if (location.pathname.includes('manage-flights.php'))  initFlights();
  if (location.pathname.includes('view-bookings.php'))  loadBookings();
});

// Custom Modal Function (replaces alert and confirm)
// This function is duplicated here to ensure it's available on admin pages
// without relying on script.js being loaded.
function showCustomModal(message, type = 'alert', callback = null) {
  const customModalElement = document.getElementById('customModal');
  if (!customModalElement) {
    console.error('Custom modal element not found. Falling back to native alert/confirm.');
    if (type === 'alert') alert(message);
    else if (type === 'confirm') return window.confirm(message);
    return;
  }
  const customModal = new bootstrap.Modal(customModalElement);
  const modalBody = document.getElementById('customModalBody');
  const modalFooter = document.getElementById('customModalFooter');
  const modalTitle = document.getElementById('customModalLabel');

  modalBody.innerHTML = `<p>${message}</p>`;
  modalFooter.innerHTML = ''; // Clear previous buttons

  if (type === 'alert') {
    modalTitle.textContent = 'Notification';
    const okButton = document.createElement('button');
    okButton.className = 'btn btn-primary rounded-pill px-4';
    okButton.textContent = 'OK';
    okButton.setAttribute('data-bs-dismiss', 'modal');
    modalFooter.appendChild(okButton);
  } else if (type === 'confirm') {
    modalTitle.textContent = 'Confirmation';
    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn btn-danger rounded-pill px-4 me-2';
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', () => {
      if (callback) callback(true);
      customModal.hide();
    });
    modalFooter.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-secondary rounded-pill px-4';
    cancelButton.textContent = 'Cancel';
    cancelButton.setAttribute('data-bs-dismiss', 'modal');
    cancelButton.addEventListener('click', () => {
      if (callback) callback(false);
    });
    modalFooter.appendChild(cancelButton);
  }
  customModal.show();
}

// Override window.alert and window.confirm for admin pages
window.alert = (message) => showCustomModal(message, 'alert');
window.confirm = (message) => {
  return new Promise((resolve) => {
    showCustomModal(message, 'confirm', (result) => {
      resolve(result);
    });
  });
};

// -------------------- Aircraft --------------------
function initAircraft() {
  const f = document.getElementById('aircraftForm');
  loadAircraft();
  f.onsubmit = e => {
    e.preventDefault();
    const payload = {
      id:      f.id.value || undefined,
      model:   f.model.value,
      total_seats: +f.total_seats.value,
      seat_config: JSON.parse(f.seat_config.value)
    };
    const method = f.id.value ? 'PUT' : 'POST';
    fetch(API_AIRCRAFT, { method, body: JSON.stringify(payload) })
      .then(r => r.json())
      .then(() => {
        f.reset();
        loadAircraft();
        window.alert('Aircraft saved successfully!');
      })
      .catch(error => {
        console.error('Error saving aircraft:', error);
        window.alert('Error saving aircraft. Please check your input.');
      });
  };
  document.getElementById('aircraftReset').onclick = () => f.reset();
}

function loadAircraft() {
  fetch(API_AIRCRAFT)
    .then(r => r.json())
    .then(data => {
      const tb = document.querySelector('#aircraftTable tbody');
      tb.innerHTML = '';
      data.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${a.id}</td>
          <td>${a.model}</td>
          <td>${a.total_seats}</td>
          <td><pre class="mb-0 small">${JSON.stringify(a.seat_config, null, 2)}</pre></td>
          <td>
            <button onclick="editAircraft(${a.id})" class="btn btn-sm btn-info me-2 rounded-pill">Edit</button>
            <button onclick="delAircraft(${a.id})" class="btn btn-sm btn-danger rounded-pill">Delete</button>
          </td>`;
        tb.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error loading aircraft:', error);
      const tb = document.querySelector('#aircraftTable tbody');
      tb.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Error loading aircraft data.</td></tr>`;
    });
}

function editAircraft(id) {
  fetch(API_AIRCRAFT)
    .then(r => r.json())
    .then(data => {
      const a = data.find(x => x.id === id);
      if (a) {
        Object.assign(document.getElementById('aircraftForm'), {
          id: { value: a.id },
          model: { value: a.model },
          total_seats: { value: a.total_seats },
          seat_config: { value: JSON.stringify(a.seat_config, null, 2) }
        });
      } else {
        window.alert('Aircraft not found.');
      }
    })
    .catch(error => {
      console.error('Error fetching aircraft for edit:', error);
      window.alert('Error loading aircraft details for editing.');
    });
}

async function delAircraft(id) {
  const confirmed = await window.confirm('Are you sure you want to delete this aircraft?');
  if (confirmed) {
    fetch(API_AIRCRAFT, { method: 'DELETE', body: JSON.stringify({ id }) })
      .then(() => {
        loadAircraft();
        window.alert('Aircraft deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting aircraft:', error);
        window.alert('Error deleting aircraft.');
      });
  }
}

// -------------------- Flights --------------------
function initFlights() {
  const f = document.getElementById('flightForm');
  loadAircraftOptions();
  loadFlightsTable();
  f.onsubmit = e => {
    e.preventDefault();
    const payload = {
      flight_id: +f.flight_id.value || undefined,
      flight_number: f.flight_number.value,
      origin: f.origin.value,
      destination: f.destination.value,
      departure_time: f.departure_time.value,
      arrival_time: f.arrival_time.value,
      available_seats: +f.available_seats.value,
      aircraft_id: +f.aircraft_id.value,
      seat_prices: JSON.parse(f.seat_prices.value)
    };
    const method = f.flight_id.value ? 'PUT' : 'POST';
    fetch(API_FLIGHTS, { method, body: JSON.stringify(payload) })
      .then(() => {
        f.reset();
        loadFlightsTable();
        window.alert('Flight saved successfully!');
      })
      .catch(error => {
        console.error('Error saving flight:', error);
        window.alert('Error saving flight. Please check your input.');
      });
  };
  document.getElementById('flightReset').onclick = () => f.reset();
}

function loadAircraftOptions() {
  fetch(API_AIRCRAFT)
    .then(r => r.json())
    .then(data => {
      const sel = document.getElementById('flightAircraft');
      if (sel) { // Check if element exists before manipulating
        sel.innerHTML = '<option value="">--select--</option>';
        data.forEach(a => {
          const option = document.createElement('option');
          option.value = a.id;
          option.textContent = a.model;
          sel.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error('Error loading aircraft options:', error);
      if (document.getElementById('flightAircraft')) {
        document.getElementById('flightAircraft').innerHTML = '<option value="">Error loading aircraft</option>';
      }
    });
}

function loadFlightsTable() {
  fetch(API_FLIGHTS)
    .then(r => r.json())
    .then(data => {
      const tb = document.querySelector('#flightsTable tbody');
      if (tb) { // Check if element exists before manipulating
        tb.innerHTML = '';
        data.forEach(f => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${f.flight_id}</td>
            <td>${f.flight_number}</td>
            <td>${f.origin} <i class="bi bi-arrow-right"></i> ${f.destination}</td>
            <td>${f.departure_time}<br>${f.arrival_time}</td>
            <td>${f.available_seats}</td>
            <td>${f.aircraft_model || 'N/A'}</td>
            <td>
              <button onclick="editFlight(${f.flight_id})" class="btn btn-sm btn-info me-2 rounded-pill">Edit</button>
              <button onclick="delFlight(${f.flight_id})" class="btn btn-sm btn-danger rounded-pill">Delete</button>
            </td>`;
          tb.appendChild(tr);
        });
      }
    })
    .catch(error => {
      console.error('Error loading flights:', error);
      const tb = document.querySelector('#flightsTable tbody');
      if (tb) {
        tb.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error loading flight data.</td></tr>`;
      }
    });
}

function editFlight(id) {
  fetch(API_FLIGHTS)
    .then(r => r.json())
    .then(data => {
      const fdata = data.find(x => x.flight_id === id);
      const f = document.getElementById('flightForm');
      if (fdata && f) {
        Object.assign(f, {
          flight_id: { value: fdata.flight_id },
          flight_number: { value: fdata.flight_number },
          origin: { value: fdata.origin },
          destination: { value: fdata.destination },
          // Format datetime-local correctly
          departure_time: { value: fdata.departure_time ? fdata.departure_time.replace(' ', 'T') : '' },
          arrival_time: { value: fdata.arrival_time ? fdata.arrival_time.replace(' ', 'T') : '' },
          available_seats: { value: fdata.available_seats },
          aircraft_id: { value: fdata.aircraft_id || '' },
          seat_prices: { value: JSON.stringify(fdata.seat_prices, null, 2) }
        });
      } else {
        window.alert('Flight not found.');
      }
    })
    .catch(error => {
      console.error('Error fetching flight for edit:', error);
      window.alert('Error loading flight details for editing.');
    });
}

async function delFlight(id) {
  const confirmed = await window.confirm('Are you sure you want to delete this flight?');
  if (confirmed) {
    fetch(API_FLIGHTS, { method: 'DELETE', body: JSON.stringify({ flight_id: id }) })
      .then(() => {
        loadFlightsTable();
        window.alert('Flight deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting flight:', error);
        window.alert('Error deleting flight.');
      });
  }
}

// -------------------- View Bookings --------------------
function loadBookings() {
  fetch(API_BOOKS)
    .then(r => r.json())
    .then(data => {
      const tb = document.querySelector('#bookingsTable tbody');
      if (tb) { // Check if element exists before manipulating
        tb.innerHTML = '';
        data.forEach(b => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${b.reservation_id}</td>
            <td>${b.username}</td>
            <td>${b.email}</td>
            <td>${b.flight_number}</td>
            <td>${b.origin} <i class="bi bi-arrow-right"></i> ${b.destination}</td>
            <td>${b.departure_time}</td>`;
          tb.appendChild(tr);
        });
      }
    })
    .catch(error => {
      console.error('Error loading bookings:', error);
      const tb = document.querySelector('#bookingsTable tbody');
      if (tb) {
        tb.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error loading booking data.</td></tr>`;
      }
    });
}
