const apiUrl = "https://mockapi.io/users";
const userList = document.getElementById("userList");
const addUserBtn = document.getElementById("addUserBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const errorMsg = document.getElementById("errorMsg");
const loading = document.getElementById("loading");

// Function to fetch and display users
async function fetchUsers() {
    userList.innerHTML = "";
    loading.classList.remove("hidden");

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to load users");

        const users = await response.json();
        loading.classList.add("hidden");

        if (users.length === 0) {
            userList.innerHTML = "<li>No users found.</li>";
            return;
        }

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    } catch (error) {
        loading.classList.add("hidden");
        userList.innerHTML = `<li class="error">${error.message}</li>`;
    }
}

// Function to add a new user
async function addUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name || !email) {
        errorMsg.textContent = "Both fields are required!";
        errorMsg.classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) throw new Error("Failed to add user");

        nameInput.value = "";
        emailInput.value = "";
        fetchUsers(); // Refresh user list
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
    }
}

// Event listeners
addUserBtn.addEventListener("click", addUser);
window.addEventListener("load", fetchUsers);
