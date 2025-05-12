import { readFile } from "fs";

const getUserById = (req, res) => {
  readFile("src/database/users.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(
        JSON.stringify({ message: `users database is not defined: ${err}` })
      );
      return;
    }

    const user = JSON.parse(data).filter((user) => user.id === req.userId);

    if (!user.length) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "id === userId doesn't exist" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user[0]));
    }
  });
};

export default getUserById;
