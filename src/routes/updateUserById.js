import fs from "fs";

const updateUserById = async (req, res) => {
  try {
    const data = await fs.promises.readFile("src/database/users.json", {
      encoding: "utf-8",
    });

    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      const newData = JSON.parse(data);

      if (body === "") {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "body is empty" }));
        return;
      }

      const index = newData.findIndex((el) => el.id === req.userId);

      if (index === -1) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "id === userId doesn't exist" }));
        return;
      }

      newData[index] = { ...JSON.parse(body), id: req.userId };

      fs.promises.writeFile(
        "src/database/users.json",
        JSON.stringify(newData, null, 2)
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newData, null, 2));
    });
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: error }));
  }
};

export default updateUserById;
