const apiUrl = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");

// Fetch users from Mock API
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        if (!data.length) {
            userList.innerHTML = "<tr><td colspan='2'>No users found</td></tr>";
            return;
        }

        // Clear previous data
        userList.innerHTML = "";

        // Loop through users and display them
        data.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
            userList.appendChild(row);
        });

    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
    }
}

// Load users when the page loads
window.addEventListener("load", fetchUsers);
