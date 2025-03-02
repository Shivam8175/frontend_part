document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const messageEl = document.getElementById("message");

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    showMessage("Please fill in all fields", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Please enter a valid email address", "error");
    return;
  }

  if (password.length < 8) {
    showMessage("Password must be at least 8 characters long", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match", "error");
    return;
  }

  // Mock API call (replace with real API)
  const userData = {
    fullName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  // Simulate API call with localStorage
  saveUser(userData)
    .then(() => {
      showMessage("Sign up successful! Redirecting to login...", "success");
      setTimeout(() => {
        // Replace with actual redirect to login page
        window.location.href = "login.html"; // Assuming a login page exists
      }, 2000);
    })
    .catch((error) => {
      showMessage("Error signing up. Please try again.", "error");
    });
});

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show message
function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  setTimeout(() => {
    messageEl.textContent = "";
    messageEl.className = "message";
  }, 5000);
}

// Mock API function using localStorage
function saveUser(userData) {
  return new Promise((resolve, reject) => {
    try {
      let users = JSON.parse(localStorage.getItem("echosphere_users") || "[]");
      if (users.some((user) => user.email === userData.email)) {
        throw new Error("Email already exists");
      }
      users.push(userData);
      localStorage.setItem("echosphere_users", JSON.stringify(users));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
