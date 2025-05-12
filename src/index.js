import http from "http";
import getUsers from "./routes/getUsers.js";
import getUserById from "./routes/getUserById.js";
import postUsers from "./routes/postUsers.js";
import updateUserById from "./routes/updateUserById.js";
import deleteUserById from "./routes/deleteUserById.js";
import { configDotenv } from "dotenv";

configDotenv();

const server = http.createServer((req, res) => {
  const { method, url } = req;

  const match = url.match(/^\/api\/users\/([a-f0-9\-]{36})$/i);

  if (method === "GET") {
    if (url === "/api/users") {
      return getUsers(req, res);
    }

    if (url.startsWith("/api/users/")) {
      if (match) {
        req.userId = match[1];
        return getUserById(req, res);
      }
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "userId is invalid (not uuid)" })
      );
    }
  } else if (method === "POST" && url === "/api/users") {
    return postUsers(req, res);
  } else if (method === "PUT") {
    if (url.startsWith("/api/users/")) {
      if (match) {
        req.userId = match[1];
        return updateUserById(req, res);
      }
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "userId is invalid (not uuid)" })
      );
    }
  } else if (method === "DELETE") {
    if (url.startsWith("/api/users")) {
      if (match) {
        req.userId = match[1];
        return deleteUserById(req, res);
      }
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "userId is invalid (not uuid)" })
      );
    }
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end("api route is invalid");
});

const port = process.argv[2] || process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
