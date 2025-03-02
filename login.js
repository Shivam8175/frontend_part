document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");

  // Validation
  if (!email || !password) {
    showMessage("Please fill in all fields", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Please enter a valid email address", "error");
    return;
  }

  // Mock API call (replace with real API)
  const loginData = { email, password };

  loginUser(loginData)
    .then(() => {
      showMessage("Login successful! Redirecting to dashboard...", "success");
      setTimeout(() => {
        // Replace with actual redirect to dashboard or homepage
        window.location.href = "index.html"; // Assuming index.html is your main page
      }, 2000);
    })
    .catch((error) => {
      showMessage(error.message || "Invalid email or password", "error");
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
function loginUser(loginData) {
  return new Promise((resolve, reject) => {
    try {
      const users = JSON.parse(
        localStorage.getItem("echosphere_users") || "[]"
      );
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );
      if (!user) {
        throw new Error("Invalid credentials");
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
