import fs from "fs";

const deleteUserById = async (req, res) => {
  try {
    const data = await fs.promises.readFile("src/database/user.json", {
      encoding: "utf-8",
    });

    const index = JSON.parse(data).findIndex((el) => el.id === req.userId);

    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "id === userId doesn't exist" }));
      return;
    }

    const newData = JSON.parse(data).filter((_, i) => i !== index);

    fs.promises.writeFile(
      "src/database/users.json",
      JSON.stringify(newData, null, 2)
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newData, null, 2));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: error }));
  }
};

export default deleteUserById;
