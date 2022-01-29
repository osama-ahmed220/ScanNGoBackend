import http from "http";
import "reflect-metadata";
import setupExpress from "./setupExpress";
import setupServer from "./setupServer";
require("dotenv").config();
const OS = require("os");
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const main = async () => {
  const { corsData, dbConnection } = await setupServer();
  if (dbConnection) {
    const SERVER_TYPE = process.env.SERVER_TYPE || "express";
    if (!!!SERVER_TYPE || SERVER_TYPE === "express") {
      const { app } = await setupExpress(corsData);
      const port = process.env.PORT || 8080;
      const httpServer = http.createServer(app);
      httpServer.listen(port, () => {
        console.log(`Server is ready at http://localhost:${port}`);
      });
    }
  }
};
main();
