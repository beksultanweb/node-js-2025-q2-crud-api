import { fork } from "child_process";
import os from "os";
import { configDotenv } from "dotenv";

configDotenv();

const cpus = os.availableParallelism();
const basePort = Number(process.env.PORT) + 1;

fork("./src/loadBalancer.js");

for (let i = 0; i < cpus - 1; i++) {
  const workerPort = basePort + i;
  fork("./src/index.js", [workerPort]);
}
