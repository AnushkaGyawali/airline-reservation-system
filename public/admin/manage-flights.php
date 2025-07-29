<?php include '../includes/header.php'; ?>
  <title>Manage Flights</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
  <script src="../../assets/js/admin.js"></script>
  <script>
    // Custom Modal Function (replaces alert and confirm) - duplicated for standalone page
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

    // Override window.alert and window.confirm for this page
    window.alert = (message) => showCustomModal(message, 'alert');
    window.confirm = (message) => {
      return new Promise((resolve) => {
        showCustomModal(message, 'confirm', (result) => {
          resolve(result);
        });
      });
    };
  </script>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <a class="navbar-brand" href="dashboard.php">Admin Panel</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAdmin" aria-controls="navbarNavAdmin" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAdmin">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="dashboard.php">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="manage-flights.php">Flights</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="manage-aircraft.php">Aircraft</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="view-bookings.php">Bookings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link btn btn-outline-light px-3 py-1 rounded-pill ms-2" href="../../logout.php">Logout</a>
      </li>
    </ul>
  </div>
</nav>

<main class="container py-5">
  <h1 class="mb-4 text-primary fw-bold">Manage Flights</h1>
  <div class="card shadow-sm p-4 mb-4">
    <h4 class="mb-3 text-secondary">Flight Details</h4>
    <form id="flightForm">
      <input type="hidden" name="flight_id" />
      <div class="mb-3">
        <label for="flight_number" class="form-label">Number:</label>
        <input name="flight_number" id="flight_number" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="origin" class="form-label">Origin:</label>
        <input name="origin" id="origin" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="destination" class="form-label">Destination:</label>
        <input name="destination" id="destination" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="departure_time" class="form-label">Departure:</label>
        <input name="departure_time" id="departure_time" type="datetime-local" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="arrival_time" class="form-label">Arrival:</label>
        <input name="arrival_time" id="arrival_time" type="datetime-local" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="available_seats" class="form-label">Seats:</label>
        <input name="available_seats" id="available_seats" type="number" min="1" class="form-control rounded-pill" required />
      </div>
      <div class="mb-3">
        <label for="flightAircraft" class="form-label">Aircraft:</label>
        <select name="aircraft_id" id="flightAircraft" class="form-select rounded-pill"></select>
      </div>
      <div class="mb-4">
        <label for="seat_prices" class="form-label">Prices (JSON):</label>
        <textarea name="seat_prices" id="seat_prices" class="form-control rounded-3" rows="4" required></textarea>
        <small class="form-text text-muted">e.g., {"economy": 150, "business": 300}</small>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary rounded-pill px-4 me-2">Save</button>
        <button type="button" id="flightReset" class="btn btn-outline-secondary rounded-pill px-4">New</button>
      </div>
    </form>
  </div>

  <h4 class="mb-3 text-secondary">Existing Flights</h4>
  <div class="table-responsive bg-white rounded-3 shadow-sm p-3">
    <table id="flightsTable" class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Number</th>
          <th>Route</th>
          <th>Times</th>
          <th>Seats</th>
          <th>Aircraft</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Flight data will be loaded here by admin.js -->
      </tbody>
    </table>
  </div>
</main>

<?php include '../includes/footer.php'; ?>
