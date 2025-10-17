const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        // Добавляем заголовки CORS
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        proxyReq.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      }
    })
  );
};