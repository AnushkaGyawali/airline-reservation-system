// Form validation script

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
        alert("Please fill in all fields.");
        e.preventDefault();
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        e.preventDefault();
      }
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
        alert("Please fill in all fields.");
        e.preventDefault();
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        e.preventDefault();
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        e.preventDefault();
      }
    });
  }
});
