import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: "https://api.gapgpt.ir",
  changeOrigin: true,
  secure: false
});

proxy.listen(5050, () => {
  console.log("Local proxy running on http://localhost:5050");
});
