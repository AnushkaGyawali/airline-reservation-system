// script.js - Airline Reservation System JS

document.addEventListener("DOMContentLoaded", () => {
  // --- Debugging: Verify Bootstrap JS Loading ---
  // Check if the Bootstrap global object is available.
  // Open your browser's developer console (F12 -> Console tab) to see these messages.
  if (typeof bootstrap !== 'undefined') {
    console.log("Bootstrap object available:", bootstrap);
    // You can also check if specific Bootstrap components are available, e.g.:
    if (typeof bootstrap.Collapse !== 'undefined') {
      console.log("Bootstrap Collapse component available.");
    } else {
      console.warn("Bootstrap Collapse component NOT found. Navbar toggle might not work.");
    }
  } else {
    console.error("Bootstrap object NOT found. Bootstrap JS bundle might not be loaded or there's an error in its loading.");
  }
  // --- End Debugging ---

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const searchForm = document.getElementById('searchForm');
  const flightResultsDiv = document.getElementById('flightResults');
  const originInput = document.getElementById('origin');
  const destinationInput = document.getElementById('destination');
  const swapBtn = document.getElementById('swapBtn');

  // Initialize Bootstrap tooltips
  // This must be called AFTER Bootstrap's JS is loaded and the DOM is ready.
  // The document.addEventListener("DOMContentLoaded") ensures DOM ready.
  // Placing script.js after bootstrap.bundle.min.js ensures Bootstrap JS loaded.
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  // Custom Modal Function (replaces alert and confirm)
  function showCustomModal(message, type = 'alert', callback = null) {
    const customModal = new bootstrap.Modal(document.getElementById('customModal'));
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

  // Override window.alert and window.confirm to use custom modal
  // This ensures a consistent UI and avoids browser-specific pop-ups.
  window.alert = (message) => showCustomModal(message, 'alert');
  window.confirm = (message) => {
    return new Promise((resolve) => {
      showCustomModal(message, 'confirm', (result) => {
        resolve(result);
      });
    });
  };

  // Toggle login/logout based on session
  // This fetch call checks the user's session status from the backend.
  fetch("../backend/auth/check_session.php", {
    credentials: "include" // Important for sending cookies/session info
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data.loggedIn) {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        // Only load reservations if on the reservations.php page
        // Added a more robust check for different URL structures
        if (location.pathname.includes('reservations.php') || location.pathname.endsWith('/public/reservations.php')) {
            loadReservations();
        }
      } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
      }
    })
    .catch(error => {
      console.error('Error checking session:', error);
      // Fallback: show login/register if session check fails or network error
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
    });

  // Load reservations (only if #reservationsContainer exists)
  function loadReservations() {
    const container = document.getElementById("reservationsContainer");
    if (!container) {
      console.log("Reservations container not found on this page.");
      return; // Exit if container doesn't exist on the page
    }

    // Display a loading spinner while fetching data
    container.innerHTML = `<div class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2 text-muted">Loading your reservations...</p></div>`;

    fetch("../backend/api/get_reservations.php", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!data.success) {
          container.innerHTML = `<p class="text-danger text-center p-3">${data.message}</p>`;
          return;
        }

        if (data.reservations.length === 0) {
          container.innerHTML = `<p class="text-muted text-center p-3">No reservations found.</p>`;
          return;
        }

        // Use Bootstrap grid for cards to display reservations
        container.innerHTML = `<div class="row g-3"></div>`;
        const rowDiv = container.querySelector('.row');

        data.reservations.forEach(r => {
          const colDiv = document.createElement("div");
          colDiv.className = "col-md-6 col-lg-4"; // Responsive columns for reservation cards
          colDiv.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title text-primary">Flight: ${r.flight_id}</h5>
                <p class="card-text mb-1"><strong>Seat:</strong> ${r.seat_no}</p>
                <p class="card-text mb-3"><strong>Status:</strong> <span class="badge ${r.status === 'Confirmed' ? 'bg-success' : 'bg-warning'}">${r.status}</span></p>
                <button class="btn btn-sm btn-danger cancel-btn rounded-pill" data-id="${r.id}">Cancel Reservation</button>
              </div>
            </div>
          `;
          rowDiv.appendChild(colDiv);
        });

        // Add event listeners to cancel buttons
        document.querySelectorAll(".cancel-btn").forEach(btn => {
          btn.addEventListener("click", async function () {
            const id = this.getAttribute("data-id");
            const confirmed = await window.confirm('Are you sure you want to cancel this reservation?');
            if (confirmed) {
              fetch(`../backend/api/cancel.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ booking_id: id }),
                credentials: "include"
              })
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then(result => {
                  window.alert(result.message);
                  if (result.success) loadReservations(); // Reload reservations on success
                })
                .catch(error => {
                  console.error('Error cancelling reservation:', error);
                  window.alert("Error cancelling reservation. Please try again.");
                });
            }
          });
        });
      })
      .catch(error => {
        console.error('Error loading reservations:', error);
        container.innerHTML = `<p class="text-danger text-center p-3">Error loading reservations.</p>`;
      });
  }

  // Swap Origin and Destination input values
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const temp = originInput.value;
      originInput.value = destinationInput.value;
      destinationInput.value = temp;
    });
  }

  // Dummy Flight Search Functionality with Skeleton Loader
  if (searchForm) {
    searchForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent default form submission

      // Display skeleton loader while searching
      flightResultsDiv.innerHTML = `
        <h3 class="text-center text-muted mb-4">Searching for flights...</h3>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="flight-card p-4">
              <div class="skeleton-loader mb-3" style="height: 25px; width: 70%;"></div>
              <div class="skeleton-loader mb-2" style="height: 20px; width: 90%;"></div>
              <div class="skeleton-loader mb-4" style="height: 18px; width: 80%;"></div>
              <div class="skeleton-loader mb-3" style="height: 40px; width: 100%;"></div>
              <div class="skeleton-loader" style="height: 40px; width: 50%; margin-left: auto;"></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="flight-card p-4">
              <div class="skeleton-loader mb-3" style="height: 25px; width: 70%;"></div>
              <div class="skeleton-loader mb-2" style="height: 20px; width: 90%;"></div>
              <div class="skeleton-loader mb-4" style="height: 18px; width: 80%;"></div>
              <div class="skeleton-loader mb-3" style="height: 40px; width: 100%;"></div>
              <div class="skeleton-loader" style="height: 40px; width: 50%; margin-left: auto;"></div>
            </div>
          </div>
        </div>
      `;

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Retrieve form values for dummy results
      const origin = originInput.value || 'New York';
      const destination = destinationInput.value || 'London';
      const departureDate = document.getElementById('departureDate').value || '2025-08-15';
      const returnDate = document.getElementById('returnDate').value || 'N/A';
      const passengers = document.getElementById('passengers').value || '1';

      // Dynamically generate dummy flight results HTML
      flightResultsDiv.innerHTML = `
        <h3 class="mb-4 text-center fw-bold text-primary">Available Flights from ${origin} to ${destination}</h3>
        <div class="row g-4">
          <!-- Flight Card 1 -->
          <div class="col-md-6">
            <div class="flight-card">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fs-5 fw-bold text-primary">Flight ARS101</span>
                <span class="badge bg-success">Non-stop</span>
              </div>
              <p class="text-muted mb-1"><strong>${origin}</strong> <i class="bi bi-arrow-right text-secondary mx-1"></i> <strong>${destination}</strong></p>
              <p class="text-muted mb-3"><i class="bi bi-calendar me-1"></i> Dep: ${departureDate} | <i class="bi bi-clock me-1"></i> 08:00 AM - 04:00 PM</p>
              
              <div class="accordion-item border-0">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    View Details
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#flightResults">
                  <div class="accordion-body text-muted small">
                    <p class="mb-1">Airline: ARS Airlines</p>
                    <p class="mb-1">Aircraft: Boeing 747</p>
                    <p class="mb-1">Duration: 8h 00m</p>
                    <p class="mb-0">Passengers: ${passengers}</p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <span class="fs-4 fw-bold text-success">$450</span>
                <button class="btn btn-primary rounded-pill px-4 shadow-sm">
                  Select Flight <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Flight Card 2 -->
          <div class="col-md-6">
            <div class="flight-card">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fs-5 fw-bold text-primary">Flight ARS102</span>
                <span class="badge bg-warning text-dark">1 Stop (via Dubai)</span>
              </div>
              <p class="text-muted mb-1"><strong>${origin}</strong> <i class="bi bi-arrow-right text-secondary mx-1"></i> <strong>${destination}</strong></p>
              <p class="text-muted mb-3"><i class="bi bi-calendar me-1"></i> Dep: ${departureDate} | <i class="bi bi-clock me-1"></i> 10:00 AM - 08:00 PM</p>
              
              <div class="accordion-item border-0">
                <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    View Details
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#flightResults">
                  <div class="accordion-body text-muted small">
                    <p class="mb-1">Airline: ARS Airlines</p>
                    <p class="mb-1">Aircraft: Airbus A380</p>
                    <p class="mb-1">Duration: 10h 00m</p>
                    <p class="mb-0">Passengers: ${passengers}</p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <span class="fs-4 fw-bold text-success">$380</span>
                <button class="btn btn-primary rounded-pill px-4 shadow-sm">
                  Select Flight <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  // Stats Counter Animation
  const animateNumbers = () => {
    const statBoxes = document.querySelectorAll('.stat-box h4');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          let current = 0;
          const increment = target / 100; // Adjust for smoother animation

          const timer = setInterval(() => {
            current += increment;
            if (current < target) {
              entry.target.textContent = Math.ceil(current) + (entry.target.getAttribute('data-target').includes('+') ? '+' : '');
            } else {
              entry.target.textContent = target + (entry.target.getAttribute('data-target').includes('+') ? '+' : '');
              clearInterval(timer);
            }
          }, 20); // Speed of animation

          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of element is visible

    statBoxes.forEach(box => {
      observer.observe(box);
    });
  };

  // Run animations when the page loads
  // Use window.addEventListener('load') to ensure all assets (including images) are loaded.
  window.addEventListener('load', animateNumbers);
});
