const express = require('express');
const app = express();
const PORT = 3000;

app.get('/home', (req, res) => {
    res.send('<h1>Welcome to Home Page</h1>');
});

app.get('/aboutus', (req, res) => {
    res.json({ "message": "Welcome to About Us" });
});

app.get('/contactus', (req, res) => {
    res.json({
        "email": "contact@example.com",
        "phone": "+91-9991234567",
        "address": "123 Main St, City, State 12345"
    });
});

app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});