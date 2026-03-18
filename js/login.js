const VALID_EMAIL = "qa@nsan80.com";
const VALID_PASSWORD = "Pass1234!";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formStatus = document.getElementById("formStatus");
const clearButton = document.getElementById("clearButton");

function resetMessages() {
  emailError.textContent = "";
  passwordError.textContent = "";
  formStatus.textContent = "";
  formStatus.className = "status-box";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(email, password) {
  let valid = true;

  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (email.length < 6) {
    emailError.textContent = "Email must be at least 6 characters.";
    valid = false;
  } else if (email.length > 100) {
    emailError.textContent = "Email must not exceed 100 characters.";
    valid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  } else if (password.length > 64) {
    passwordError.textContent = "Password must not exceed 64 characters.";
    valid = false;
  }

  return valid;
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  resetMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const valid = validateForm(email, password);

  if (!valid) {
    formStatus.textContent = "Login failed. Fix validation errors and try again.";
    formStatus.className = "status-box error";
    return;
  }

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    sessionStorage.setItem("nsan80_auth", "true");
    formStatus.textContent = "Login successful. Redirecting...";
    formStatus.className = "status-box success";

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 500);

    return;
  }

  formStatus.textContent = "Invalid email or password.";
  formStatus.className = "status-box error";
});

clearButton.addEventListener("click", function () {
  loginForm.reset();
  resetMessages();
  emailInput.focus();
});
const toggleHint = document.getElementById("toggleHint");
const hintBox = document.querySelector('[data-testid="login-hint"]');

toggleHint.addEventListener("click", function () {
  hintBox.classList.toggle("hidden");

  toggleHint.textContent =
    hintBox.classList.contains("hidden")
      ? "Show QA Credentials"
      : "Hide QA Credentials";
});
