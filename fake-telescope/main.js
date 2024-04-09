const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // Set to false to allow GPU usage
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--display=' + process.env.DISPLAY,
            '--start-fullscreen', // Launch in full-screen mode
            '--kiosk', // Kiosk mode might also be useful, but behavior can vary
            '--app=https://daed.on.br/astro/coordenadas-horizontais' // Launches the browser with the specified app or URL in app mode
        ]
    });
    // Keep the browser open
})();