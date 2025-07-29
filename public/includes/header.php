<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
  <!-- Font Awesome for additional icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <!-- Custom Stylesheet (path relative to the file including this header) -->
  <!-- This link will be adjusted in each PHP file based on its location -->
  <!-- For public/ files: <link rel="stylesheet" href="assets/css/style.css"> -->
  <!-- For public/admin/ files: <link rel="stylesheet" href="../../assets/css/style.css"> -->
  
  <!-- Page-specific title will be inserted here by each PHP file -->
  <!-- Page-specific CSS/JS will be inserted here by each PHP file -->
</head>
<body>

<!-- Custom Alert/Confirm Modal Structure (Hidden by default) -->
<div id="customModal" class="modal fade" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="customModalLabel">Message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="customModalBody">
        <!-- Message content will be inserted here -->
      </div>
      <div class="modal-footer" id="customModalFooter">
        <!-- Buttons will be inserted here -->
      </div>
    </div>
  </div>
</div>

<!-- Top Bar -->
<div class="bg-dark text-light py-2">
  <div class="container d-flex justify-content-between align-items-center">
    <div>✈️ Airline Reservation System</div>
    <div>
      <a href="#" class="text-white me-2"><i class="bi bi-facebook"></i></a>
      <a href="#" class="text-white me-2"><i class="bi bi-twitter"></i></a>
      <a href="#" class="text-white"><i class="bi bi-linkedin"></i></a>
    </div>
  </div>
</div>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.php">ARS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navLinks">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="index.php#searchSection">Search Flights</a></li>
        <li class="nav-item"><a class="nav-link" href="reservations.php">My Reservations</a></li>
      </ul>
      <ul class="navbar-nav">
        <!-- The loginBtn and logoutBtn display will be controlled by script.js -->
        <li class="nav-item"><a id="loginBtn" class="nav-link btn btn-light text-primary px-3 py-1 rounded-pill" href="login.php">Login / Register</a></li>
        <li class="nav-item"><a id="logoutBtn" class="nav-link btn btn-outline-light px-3 py-1 rounded-pill" href="logout.php" style="display: none;">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
