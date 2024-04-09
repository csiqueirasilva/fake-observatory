const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, async () => {
    const browser = await puppeteer.launch({
        headless: false, // Set to false to allow GPU usage
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--display=' + process.env.DISPLAY,
            '--start-fullscreen', // Launch in full-screen mode
            '--kiosk', // Kiosk mode might also be useful, but behavior can vary
            '--app=http://localhost:3000' // Launches the browser with the specified app or URL in app mode
        ]
    });
    console.log(`Server is running on http://localhost:${port}`);
});