const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  // app.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: "http://localhost",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/guest",
  //   createProxyMiddleware({
  //     target: "http://localhost",
  //     //pathRewrite: { "^/guest": "" },
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/host",
  //   createProxyMiddleware({
  //     target: "http://localhost",
  //     //pathRewrite: { "^/host": "" },
  //     changeOrigin: true,
  //   })
  // );
};
