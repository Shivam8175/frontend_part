let socket;
let selectedUser = null; //coming from async function selectUser()
const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

// Initialize socket connection
function initializeSocket() {
  socket = io("https://masai-x10-25hack.onrender.com", {
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to server");
    loadUsers();
  });

  socket.on("privateMessage", (data) => {
    if (
      selectedUser &&
      (data.from === selectedUser.email || data.to === selectedUser.email)
    ) {
      displayMessage(data);
    }
  });

  socket.on("userOnline", (data) => {
    updateUserStatus(data.userId, true);
  });

  socket.on("userOffline", (data) => {
    updateUserStatus(data.userId, false);
  });
}

// Load users for sidebar
async function loadUsers() {
  try {
    const response = await fetch(
      "https://masai-x10-25hack.onrender.com/message",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

// Display users in sidebar
function displayUsers(users) {
  //sidebar
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  //creating side card for every users...
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-item";
    userDiv.innerHTML = `
             <img src="${
               user.profilePic ||
               "https://www.shutterstock.com/image-vector/dairy-cow-milk-animal-vector-600nw-2458340235.jpg"
             }" alt="${user.name}">
            <div>
                <strong>${user.name}</strong>
                <div>${user.email}</div>
            </div>
        `;
    userDiv.onclick = () => selectUser(user); //selecting user for chatting
    usersList.appendChild(userDiv); // showing users in left side bar
  });
}

// Select user to chat by adding and removing class name "active"
async function selectUser(user) {
  selectedUser = user;
  document
    .querySelectorAll(".user-item")
    .forEach((item) => item.classList.remove("active"));
  event.currentTarget.classList.add("active");

  // Update chat header at top
  document.getElementById("selectedUserProfile").src =
    user.profilePic ||
    "https://www.shutterstock.com/image-vector/dairy-cow-milk-animal-vector-600nw-2458340235.jpg";
  document.getElementById("selectedUserName").textContent = user.name;

  // Load chat history
  await loadChatHistory(user._id);
}

// Load chat history with selected user
// Remove the separate displayChatHistory function and modify loadChatHistory

async function loadChatHistory(userId) {
  try {
    const response = await fetch(
      `https://masai-x10-25hack.onrender.com/message/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const messages = await response.json();

    // Display chat history (previously in displayChatHistory function)
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";

    messages.forEach((message) => {
      displayMessage({
        from:
          message.senderId === currentUser._id
            ? currentUser.email
            : selectedUser.email,
        message: message.text,
        image: message.image,
        timestamp: message.createdAt,
      });
    });
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
}

// Send message and instently desplay
async function sendMessage() {
  if (!selectedUser) return;

  const messageInput = document.getElementById("messageInput");
  const imageInput = document.getElementById("imageInput");
  const message = messageInput.value.trim();
  const imageFile = imageInput.files[0]; // Uncommented this line

  if (!message && !imageFile) return;

  let imageUrl = null;
  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }

  // Create message data
  const messageData = {
    from: currentUser.email,
    message: message,
    image: imageUrl,
    timestamp: Date.now(),
  };
  console.log(messageData);

  // Display message immediately
  displayMessage(messageData);

  // Emit socket event
  socket.emit("privateMessage", {
    to: selectedUser._id,
    message,
    image: imageUrl,
  });

  // Clear inputs
  messageInput.value = "";
  imageInput.value = "";
}

// Upload image to Cloudinary
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Display message in chat
function displayMessage(data) {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${
    data.from === currentUser.email ? "sent" : "received"
  }`;

  let content = data.message ? `<p>${data.message}</p>` : "";
  if (data.image) {
    content += `<img src="${data.image}" alt="Shared image">`;
  }

  const timestamp = new Date(data.timestamp).toLocaleTimeString();
  content += `<div class="timestamp">${timestamp}</div>`;

  messageDiv.innerHTML = content;
  chatMessages.appendChild(messageDiv); // Fixed this line
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update user online/offline status
function updateUserStatus(userId, isOnline) {
  const userDiv = document.querySelector(`.user-item[data-userid="${userId}"]`);
  if (userDiv) {
    userDiv.style.opacity = isOnline ? 1 : 0.5;
  }
}

// Initialize the chat application
document.addEventListener("DOMContentLoaded", () => {
  if (!token || !currentUser) {
    window.location.href = "./chat.html";
    return;
  }

  // Set current user info
  document.getElementById("currentUserProfile").src =
    currentUser.profilePic ||
    "https://t3.ftcdn.net/jpg/05/91/58/36/360_F_591583639_JaAqX4y6rORJshkPtctq5weTeNQ92js6.jpg ";
  document.getElementById("currentUserName").textContent = currentUser.name;

  initializeSocket();
});
