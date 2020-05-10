const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ['/getuserdata',
    '/getuseraddress',
    '/createuser',
  '/getuserinfo',
'/adduseraddress',
'/updateuseraddress'],
    createProxyMiddleware({
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:8080': 'ec2-3-22-178-16.us-east-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};

