const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const BUBBLE_APP_URL = 'https://yourapp.bubbleapps.io/version-test';

// Middleware to handle all requests
app.use(async (req, res) => {
    try {
        // Extract subdomain from host header
        const host = req.headers.host;
        const subdomain = host.split('.')[0];
        
        // Construct the Bubble.io URL
        const bubbleUrl = `${BUBBLE_APP_URL}/${subdomain}`;
        
        // Forward the request to Bubble.io
        const response = await fetch(bubbleUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
                'Accept-Language': req.headers['accept-language'] || 'en-US,en;q=0.5',
            }
        });

        // If the response is not ok, return 404
        if (!response.ok) {
            return res.status(404).send('Page not found');
        }

        // Forward all headers from Bubble.io response
        const headers = response.headers.raw();
        Object.keys(headers).forEach(key => {
            res.setHeader(key, headers[key]);
        });

        // Stream the response body
        response.body.pipe(res);

    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(404).send('Page not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
