// Sample User Data
const suggestedUsers = [
  {
    id: 1,
    name: "Michael Scott",
    job: "Regional Manager",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-1tcZ9AWzzwu277kA0NAaGBdohRFmt-r59Q&s",
  },
  {
    id: 2,
    name: "Pam Beesly",
    job: "Graphic Designer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6-KsNGUoKgyIAATW1CNPeVSHhZzS_FN0Zg&s",
  },
  {
    id: 3,
    name: "Jim Halpert",
    job: "Salesman",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRq2uK8vemZWrys8JcWzTuKGyS1dh-KjBag&s",
  },
];

const pendingRequests = [
  {
    id: 4,
    name: "Dwight Schrute",
    job: "Assistant to the Regional Manager",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzOCfBjzTWtx3wtOIlHPh6llR_ZLjQgLBGg&s",
  },
];

// Function to Load Suggested Users
function loadSuggestedUsers() {
  const container = document.getElementById("suggestions-container");
  container.innerHTML = "";
  suggestedUsers.forEach((user) => {
    let card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
            <img src="${user.img}" alt="${user.name}">
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${user.job}</p>
            </div>
            <button class="connect-btn" onclick="sendRequest(${user.id})">Connect</button>
        `;
    container.appendChild(card);
  });
}

// Function to Load Pending Requests
function loadPendingRequests() {
  const container = document.getElementById("requests-container");
  container.innerHTML = "";
  pendingRequests.forEach((user) => {
    let card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
            <img src="${user.img}" alt="${user.name}">
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${user.job}</p>
            </div>
            <div class="button-container">
                <button class="accept-btn" onclick="acceptRequest(${user.id})">Accept</button>
                <button class="reject-btn" onclick="rejectRequest(${user.id})">Reject</button>
            </div>
        `;
    container.appendChild(card);
  });
}

// Function to Send Request
function sendRequest(id) {
  const user = suggestedUsers.find((user) => user.id === id);
  pendingRequests.push(user);
  suggestedUsers.splice(suggestedUsers.indexOf(user), 1);
  loadSuggestedUsers();
  loadPendingRequests();
}

// Function to Accept Request
function acceptRequest(id) {
  pendingRequests.splice(
    pendingRequests.findIndex((user) => user.id === id),
    1
  );
  loadPendingRequests();
}

// Function to Reject Request
function rejectRequest(id) {
  pendingRequests.splice(
    pendingRequests.findIndex((user) => user.id === id),
    1
  );
  loadPendingRequests();
}

// Load Data on Page Load
document.addEventListener("DOMContentLoaded", () => {
  loadSuggestedUsers();
  loadPendingRequests();
});
