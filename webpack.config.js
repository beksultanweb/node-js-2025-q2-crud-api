import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  target: "node",
  entry: "./src/cluster.js", // entry point — кластерный запуск
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".js"],
  },
};
