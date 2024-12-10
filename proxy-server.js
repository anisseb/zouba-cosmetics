require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const placesProxy = createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/places': '/maps/api/place'
  },
  onProxyReq: (proxyReq, req, res) => {
    if (!proxyReq.path.includes('key=')) {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      const separator = proxyReq.path.includes('?') ? '&' : '?';
      proxyReq.path = `${proxyReq.path}${separator}key=${apiKey}`;
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy error occurred' });
  },
  logLevel: 'debug'
});

app.use('/api/places', placesProxy);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});