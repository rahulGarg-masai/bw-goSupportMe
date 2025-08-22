// Initialize Socket.IO connection
const socket = io();

// DOM elements
const registrationDiv = document.getElementById('registration');
const chatInterface = document.getElementById('chatInterface');
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const isAdminCheckbox = document.getElementById('isAdmin');
const registrationError = document.getElementById('registrationError');

const currentUserSpan = document.getElementById('currentUser');
const disconnectBtn = document.getElementById('disconnectBtn');
const onlineUsersList = document.getElementById('onlineUsersList');
const userCountSpan = document.getElementById('userCount');
const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const adminControls = document.getElementById('adminControls');
const announcementInput = document.getElementById('announcementInput');
const sendAnnouncementBtn = document.getElementById('sendAnnouncementBtn');

// Application state
let currentUser = null;
let isRegistered = false;

// Registration form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const isAdmin = isAdminCheckbox.checked;
    
    if (username) {
        socket.emit('register', { username, isAdmin });
    }
});

// Send message functionality
function sendMessage() {
    const text = messageInput.value.trim();
    if (text && isRegistered) {
        socket.emit('sendMessage', { text });
        messageInput.value = '';
    }
}

// Send announcement functionality
function sendAnnouncement() {
    const text = announcementInput.value.trim();
    if (text && isRegistered && currentUser && currentUser.isAdmin) {
        socket.emit('sendAnnouncement', { text });
        announcementInput.value = '';
    }
}

// Event listeners for sending messages
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Event listeners for sending announcements
sendAnnouncementBtn.addEventListener('click', sendAnnouncement);
announcementInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendAnnouncement();
    }
});

// Disconnect functionality
disconnectBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to disconnect?')) {
        socket.emit('manualDisconnect');
        resetToRegistration();
    }
});

// Socket event listeners
socket.on('registrationSuccess', (userData) => {
    currentUser = userData;
    isRegistered = true;
    
    // Hide registration form and show chat interface
    registrationDiv.classList.add('hidden');
    chatInterface.classList.remove('hidden');
    
    // Update UI
    currentUserSpan.textContent = `${userData.username}${userData.isAdmin ? ' (Admin)' : ''}`;
    
    // Show admin controls if user is admin
    if (userData.isAdmin) {
        adminControls.classList.remove('hidden');
    }
    
    // Focus on message input
    messageInput.focus();
});

socket.on('registrationError', (error) => {
    registrationError.textContent = error;
    registrationError.style.display = 'block';
});

socket.on('onlineUsers', (users) => {
    updateOnlineUsersList(users);
});

socket.on('newMessage', (message) => {
    displayMessage(message);
});

socket.on('chatHistory', (messages) => {
    messageContainer.innerHTML = '';
    messages.forEach(message => {
        displayMessage(message);
    });
});

socket.on('error', (error) => {
    alert('Error: ' + error);
});

socket.on('disconnect', () => {
    resetToRegistration();
});

// Helper functions
function updateOnlineUsersList(users) {
    userCountSpan.textContent = users.length;
    onlineUsersList.innerHTML = '';
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = `user-item${user.isAdmin ? ' admin' : ''}`;
        
        userElement.innerHTML = `
            <span>${user.username}</span>
            ${user.isAdmin ? '<span class="admin-badge">ADMIN</span>' : ''}
        `;
        
        onlineUsersList.appendChild(userElement);
    });
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    if (message.isAdmin) {
        messageElement.classList.add('admin');
    }
    
    if (message.isAnnouncement) {
        messageElement.classList.add('announcement');
    }
    
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-username${message.isAdmin ? ' admin' : ''}">
                ${message.username}
                ${message.isAnnouncement ? '<span class="announcement-label">ANNOUNCEMENT</span>' : ''}
            </span>
            <span class="message-time">${timestamp}</span>
        </div>
        <div class="message-text">${escapeHtml(message.text)}</div>
    `;
    
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function resetToRegistration() {
    currentUser = null;
    isRegistered = false;
    
    // Show registration form and hide chat interface
    registrationDiv.classList.remove('hidden');
    chatInterface.classList.add('hidden');
    
    // Clear form
    usernameInput.value = '';
    isAdminCheckbox.checked = false;
    registrationError.textContent = '';
    registrationError.style.display = 'none';
    
    // Clear chat interface
    messageContainer.innerHTML = '';
    onlineUsersList.innerHTML = '';
    userCountSpan.textContent = '0';
    adminControls.classList.add('hidden');
    
    // Focus on username input
    usernameInput.focus();
}

// Focus on username input on page load
window.addEventListener('load', () => {
    usernameInput.focus();
});