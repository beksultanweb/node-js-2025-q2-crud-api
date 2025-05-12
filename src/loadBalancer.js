import http from "http";
import { configDotenv } from "dotenv";
import os from "os";

configDotenv();

const basePort = Number(process.env.PORT);
const workerCount = os.availableParallelism() - 1;

const WORKER_PORTS = Array.from(
  { length: workerCount },
  (_, i) => basePort + i + 1
);

let current = 0;

const server = http.createServer((req, res) => {
  const targetPort = WORKER_PORTS[current];
  current = (current + 1) % WORKER_PORTS.length;

  const proxy = http.request(
    {
      hostname: "localhost",
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  req.pipe(proxy);

  proxy.on("error", (err) => {
    res.writeHead(500);
    res.end(`Proxy error: ${err.message}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Load balancer running on http://localhost:${process.env.PORT}`);
});
