<?php include 'includes/header.php'; ?>
  <title>ARS - Airline Reservation System</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- Hero -->
<section class="hero text-white text-center py-5 position-relative overflow-hidden">
  <div class="container position-relative z-1">
    <h1 class="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">Book Your Flight with ARS</h1>
    <p class="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">Fast, secure, and reliable flight booking system</p>
    <a href="#searchSection" class="btn btn-light btn-lg mt-3 rounded-pill shadow-sm animate__animated animate__zoomIn animate__delay-2s">Start Searching <i class="bi bi-arrow-right-short"></i></a>
  </div>
</section>

<!-- Search Flights -->
<section id="searchSection" class="py-5 bg-light">
  <div class="container">
    <h2 class="mb-4 text-center fw-bold text-primary">Search Available Flights</h2>
    <form id="searchForm" class="row g-3 align-items-end p-4 bg-white rounded-3 shadow-sm">
      <div class="col-md-3">
        <label for="origin" class="form-label">Origin</label>
        <input type="text" class="form-control rounded-pill" id="origin" placeholder="e.g., New York" required>
      </div>
      <div class="col-md-1 d-flex justify-content-center">
        <button type="button" id="swapBtn" class="btn btn-outline-secondary rounded-circle p-2 shadow-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Swap Origin and Destination">
          <i class="bi bi-arrow-left-right"></i>
        </button>
      </div>
      <div class="col-md-3">
        <label for="destination" class="form-label">Destination</label>
        <input type="text" class="form-control rounded-pill" id="destination" placeholder="e.g., London" required>
      </div>
      <div class="col-md-2">
        <label for="departureDate" class="form-label">Departure Date</label>
        <input type="date" class="form-control rounded-pill" id="departureDate" required>
      </div>
      <div class="col-md-2">
        <label for="returnDate" class="form-label">Return Date (Optional)</label>
        <input type="date" class="form-control rounded-pill" id="returnDate">
      </div>
      <div class="col-md-1">
        <label for="passengers" class="form-label">Passengers</label>
        <select class="form-select rounded-pill" id="passengers" required>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary btn-lg rounded-pill shadow-lg px-5">
          <i class="bi bi-search me-2"></i> Search Flights
        </button>
      </div>
    </form>
    <div id="flightResults" class="mt-5">
      <!-- Flight results will be dynamically loaded here -->
    </div>
  </div>
</section>

<!-- Features -->
<section class="features py-5 bg-white">
  <div class="container">
    <h3 class="text-center mb-5 fw-bold text-primary">Why Choose ARS?</h3>
    <div class="row text-center g-4">
      <div class="col-md-3">
        <div class="card p-4 h-100 shadow-sm border-0 animate__animated animate__fadeInUp">
          <div class="card-body">
            <i class="bi bi-airplane-engines fs-1 mb-3 text-primary"></i>
            <h5 class="card-title fw-bold">Comfortable Flights</h5>
            <p class="card-text text-muted">Fly in style and comfort on every journey with our premium services.</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-4 h-100 shadow-sm border-0 animate__animated animate__fadeInUp animate__delay-1s">
          <div class="card-body">
            <i class="bi bi-headset fs-1 mb-3 text-success"></i>
            <h5 class="card-title fw-bold">24/7 Support</h5>
            <p class="card-text text-muted">Need help? Our dedicated support team is always ready to assist you.</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-4 h-100 shadow-sm border-0 animate__animated animate__fadeInUp animate__delay-2s">
          <div class="card-body">
            <i class="bi bi-people fs-1 mb-3 text-warning"></i>
            <h5 class="card-title fw-bold">Expert Crew</h5>
            <p class="card-text text-muted">Our highly experienced crew ensures safety and provides top-notch service.</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-4 h-100 shadow-sm border-0 animate__animated animate__fadeInUp animate__delay-3s">
          <div class="card-body">
            <i class="bi bi-currency-dollar fs-1 mb-3 text-danger"></i>
            <h5 class="card-title fw-bold">Affordable Pricing</h5>
            <p class="card-text text-muted">Enjoy competitive fares without compromising on quality or comfort.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="stats py-5 bg-primary text-white">
  <div class="container text-center">
    <h3 class="mb-5 fw-bold">Trusted by Thousands</h3>
    <div class="row g-4">
      <div class="col-md-3">
        <div class="stat-box bg-white text-primary p-4 rounded-3 shadow-sm">
          <h4 class="display-4 fw-bold" data-target="94">0+</h4>
          <p class="lead mb-0">Routes Covered</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-box bg-white text-primary p-4 rounded-3 shadow-sm">
          <h4 class="display-4 fw-bold" data-target="126">0+</h4>
          <p class="lead mb-0">Professional Pilots</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-box bg-white text-primary p-4 rounded-3 shadow-sm">
          <h4 class="display-4 fw-bold" data-target="45">0+</h4>
          <p class="lead mb-0">New Joinees</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-box bg-white text-primary p-4 rounded-3 shadow-sm">
          <h4 class="display-4 fw-bold" data-target="32">0</h4>
          <p class="lead mb-0">Awards Won</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact -->
<section class="py-5 bg-light">
  <div class="container">
    <h3 class="mb-4 text-center fw-bold text-primary">Contact Us</h3>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="p-4 bg-white rounded-3 shadow-sm">
          <form>
            <div class="mb-3">
              <label for="contactName" class="form-label visually-hidden">Your Name</label>
              <input class="form-control rounded-pill" type="text" id="contactName" placeholder="Your Name" required>
            </div>
            <div class="mb-3">
              <label for="contactEmail" class="form-label visually-hidden">Your Email</label>
              <input class="form-control rounded-pill" type="email" id="contactEmail" placeholder="Your Email" required>
            </div>
            <div class="mb-3">
              <label for="contactSubject" class="form-label visually-hidden">Subject</label>
              <input class="form-control rounded-pill" type="text" id="contactSubject" placeholder="Subject" required>
            </div>
            <div class="mb-3">
              <label for="contactMessage" class="form-label visually-hidden">Your Message</label>
              <textarea class="form-control rounded-3" id="contactMessage" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-sm">Send Message <i class="bi bi-send"></i></button>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-4 bg-white rounded-3 shadow-sm">
          <ul class="list-group list-group-flush mb-4">
            <li class="list-group-item border-0 d-flex align-items-center"><i class="bi bi-telephone-fill text-primary me-3 fs-5"></i> <strong>Phone:</strong> +977-9861907455</li>
            <li class="list-group-item border-0 d-flex align-items-center"><i class="bi bi-envelope-fill text-primary me-3 fs-5"></i> <strong>Email:</strong> info@ars.edu</li>
            <li class="list-group-item border-0 d-flex align-items-center"><i class="bi bi-geo-alt-fill text-primary me-3 fs-5"></i> <strong>Location:</strong> Sanepa, Lalitpur, Nepal</li>
            <li class="list-group-item border-0 d-flex align-items-center"><i class="bi bi-globe text-primary me-3 fs-5"></i> <strong>Website:</strong> www.ars.edu</li>
          </ul>
          <div class="map-container rounded-3 overflow-hidden shadow-sm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.842030635956!2d85.3146039150001!3d27.690800682798953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a0f4a8e0d7%3A0x3f6b7c8e9b6c0e0!2sSanepa%2C%20Lalitpur%2044700%2C%20Nepal!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
<?php
// db.php - Database Connection Configuration

// Database credentials for localhost
$servername = "localhost"; // Your MySQL server hostname
$username = "root";      // Your MySQL username (e.g., "root" for XAMPP/WAMP default)
$password = "";          // Your MySQL password (empty by default for XAMPP/WAMP root user)
$database = "airlines_db"; // <-- IMPORTANT: Replace with your actual database name

// Create a new MySQLi connection
// The @ symbol suppresses warnings, allowing for custom error handling below.
$conn = @new mysqli($servername, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    // If connection fails, terminate the script and display an error message.
    // In a production environment, you might log the error and show a generic message to the user.
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Set character set to UTF-8 for proper handling of various characters
// This should be done after a successful connection.
$conn->set_charset("utf8mb4");

// If the script reaches this point, the connection is successful and $conn is ready to be used.
// No 'echo' here, as this file is typically included and should not output directly.

?>
