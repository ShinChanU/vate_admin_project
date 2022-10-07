const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://server.vate.kr:8080",
      changeOrigin: true,
    })
  );
};
