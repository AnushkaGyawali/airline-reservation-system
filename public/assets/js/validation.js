// Form validation script

// Custom Modal Function (replaces alert and confirm)
// This function is duplicated here to ensure it's available on pages
// where validation.js is used directly (e.g., login, register).
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

// Override window.alert for this script
window.alert = (message) => showCustomModal(message, 'alert');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Login form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) {
        window.alert("Please fill in all fields.");
        e.preventDefault();
        return;
      }

      if (!validateEmail(email)) {
        window.alert("Please enter a valid email.");
        e.preventDefault();
      }
      // Note: Password length validation is now handled in the login.php script directly
      // to ensure it uses the custom modal consistently with other messages.
    });
  }

  // Register form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;

      if (!username || !email || !password) {
        window.alert("Please fill in all fields.");
        e.preventDefault();
        return;
      }

      if (!validateEmail(email)) {
        window.alert("Please enter a valid email.");
        e.preventDefault();
        return;
      }

      if (password.length < 6) {
        window.alert("Password must be at least 6 characters long.");
        e.preventDefault();
      }
    });
  }
});
