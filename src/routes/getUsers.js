import { readFile } from "fs";

const getUsers = (req, res) => {
  readFile("src/database/users.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(
        JSON.stringify({ message: `users database is not defined: ${err}` })
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
};

export default getUsers;
