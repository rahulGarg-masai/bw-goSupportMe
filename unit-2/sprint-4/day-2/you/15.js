function registerUser(callback) {
    setTimeout(() => {
        console.log("User registered");
        callback(null);
    }, 1000);
}

function sendVerification(callback) {
    setTimeout(() => {
        console.log("Verification email sent");
        callback(null);
    }, 1000);
}

function loginUser(callback) {
    setTimeout(() => {
        console.log("User logged in");
        callback(null);
    }, 1000);
}

function displayWelcomeMessage() {
    setTimeout(() => {
        console.log("Welcome message displayed");
    }, 1000);
}

function handleError(error) {
    console.error("Error:", error);
}

registerUser((err) => {
    if (err) return handleError(err);
    sendVerification((err) => {
        if (err) return handleError(err);
        loginUser((err) => {
            if (err) return handleError(err);
            displayWelcomeMessage();
        });
    });
});
