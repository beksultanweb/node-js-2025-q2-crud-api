import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const postUsers = async (req, res) => {
  try {
    const data = await fs.promises.readFile("src/database/users.json");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      let newData = JSON.parse(data);

      if (body === "") {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "body is empty" }));

        return;
      }

      const newUser = JSON.parse(body);

      if (!newUser.age || !newUser.username || !newUser.hobbies) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "body does not contain required fields" })
        );

        return;
      }
      newData.push({ ...newUser, id: uuidv4() });

      await fs.promises.writeFile(
        "src/database/users.json",
        JSON.stringify(newData, null, 2)
      );

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newData, null, 2));
    });
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: error }));
  }
};

export default postUsers;
