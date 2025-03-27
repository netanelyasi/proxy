# Bubble.io Reverse Proxy

A Node.js reverse proxy server that serves landing pages from a Bubble.io app based on subdomains.

## Features

- Extracts subdomain from the Host header
- Forwards requests to corresponding Bubble.io pages
- Maintains original subdomain URL in browser
- Returns 404 for non-existent pages
- Ready for deployment on Render.com

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your Bubble.io app URL:
   - Open `server.js`
   - Update the `BUBBLE_APP_URL` constant with your Bubble.io app URL

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

The server expects requests with subdomains in the format:
`<subdomain>.yourdomain.com`

For example:
- `client1.yourdomain.com` will fetch `https://yourapp.bubbleapps.io/version-test/client1`
- `client2.yourdomain.com` will fetch `https://yourapp.bubbleapps.io/version-test/client2`

## Deployment

This project is configured for deployment on Render.com. Simply:

1. Push your code to a Git repository
2. Connect your repository to Render.com
3. Create a new Web Service
4. Select this repository
5. Render will automatically detect the `render.yaml` configuration

## Requirements

- Node.js 14.x or higher
- Express.js
- node-fetch 
