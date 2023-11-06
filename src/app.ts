import express from "express";
import config from "./config";

const startServer = async () => {
  const app = express();

  (await import("./loader")).default({ app });

  app
    .listen(config.port, () =>
      console.log(`server running on port ${config.port}`)
    )
    .on("error", (error) => {
      console.log(error.message);
      process.exit(1);
    });
};

startServer();
