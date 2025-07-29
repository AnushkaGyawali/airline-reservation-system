
<?php include 'includes/header.php'; ?>

<!DOCTYPE html>
<html lang="en">

  <title>Login</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <script src="assets/js/validation.js"></script>
  <script>
    // Custom Modal Function (replaces alert and confirm) - duplicated for standalone page
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

    // Override window.alert for this page
    window.alert = (message) => showCustomModal(message, 'alert');

    const loginMsg = document.getElementById("loginMsg");
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      loginMsg.textContent = "";
      loginMsg.className = "";

      // Manual validation before fetch, as validation.js handles alert()
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        window.alert("Please fill in all fields.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        window.alert("Please enter a valid email.");
        return;
      }
      if (password.length < 6) {
        window.alert("Password must be at least 6 characters long.");
        return;
      }

      const formData = new FormData(this);
      try {
        const response = await fetch("../backend/auth/login.php", {
          method: "POST",
          body: formData,
          credentials: "include"
        });
        const result = await response.json();
        loginMsg.textContent = result.message;
        if (result.success) {
          loginMsg.classList.add("text-success");
          setTimeout(() => window.location.href = "index.php", 1000);
        } else {
          loginMsg.classList.add("text-danger");
        }
      } catch (error) {
        console.error('Login error:', error);
        loginMsg.textContent = "Server error. Please try again later.";
        loginMsg.classList.add("text-danger");
      }
    });
  </script>
</head>
<body>

<div class="container py-5 d-flex justify-content-center align-items-center min-vh-100">
  <div class="card shadow p-4" style="min-width: 350px; max-width: 450px; width: 100%; border-radius: 0.75rem;">
    <h3 class="mb-4 text-center fw-bold text-primary">Login</h3>
    <form id="loginForm" novalidate>
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input id="email" type="email" name="email" class="form-control rounded-pill" required />
      </div>
      <div class="mb-4">
        <label class="form-label" for="password">Password</label>
        <input id="password" type="password" name="password" class="form-control rounded-pill" required minlength="6" autocomplete="off" />
      </div>
      <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 shadow-sm">Login</button>
      <p id="loginMsg" class="mt-3 text-center fw-bold"></p>
    </form>
    <p class="text-center mt-4 text-muted">Don’t have an account? <a href="register.php" class="text-decoration-none fw-bold">Register here</a></p>
  </div>
</div>
  </html>
<?php include 'includes/footer.php'; ?>
