<?php include '../includes/header.php'; ?>
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
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
        <a class="nav-link active" aria-current="page" href="dashboard.php">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="manage-flights.php">Flights</a>
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
  <h1 class="mb-4 text-primary fw-bold">Welcome, Admin!</h1>
  <p class="lead text-muted">Use the navigation links above to manage flights, aircraft, and view bookings.</p>

  <div class="row mt-5 g-4">
    <div class="col-md-4">
      <div class="card text-center shadow-sm h-100">
        <div class="card-body">
          <i class="bi bi-airplane-fill fs-1 text-primary mb-3"></i>
          <h5 class="card-title fw-bold">Manage Flights</h5>
          <p class="card-text text-muted">Add, edit, or delete flight schedules.</p>
          <a href="manage-flights.php" class="btn btn-primary rounded-pill mt-3">Go to Flights</a>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card text-center shadow-sm h-100">
        <div class="card-body">
          <i class="bi bi-gear-fill fs-1 text-success mb-3"></i>
          <h5 class="card-title fw-bold">Manage Aircraft</h5>
          <p class="card-text text-muted">Maintain aircraft models and seat configurations.</p>
          <a href="manage-aircraft.php" class="btn btn-success rounded-pill mt-3">Go to Aircraft</a>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card text-center shadow-sm h-100">
        <div class="card-body">
          <i class="bi bi-book-fill fs-1 text-info mb-3"></i>
          <h5 class="card-title fw-bold">View Bookings</h5>
          <p class="card-text text-muted">Review all customer reservations.</p>
          <a href="view-bookings.php" class="btn btn-info text-white rounded-pill mt-3">Go to Bookings</a>
        </div>
      </div>
    </div>
  </div>
</main>

<?php include '../includes/footer.php'; ?>
