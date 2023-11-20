import type { Application } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "../config";
import indexRouter from "../routes";
import { ErrorHandler } from "../middleware";
import "express-async-errors";
import { DateTime } from "../utils";

export default async ({ app }: { app: Application }) => {
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.enable("trust proxy");

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    console.log("\n- - -\n");
    DateTime();
    next();
  });
  app.use(morgan(config.logs.morgan));

  indexRouter(app);

  app.use(ErrorHandler);
};
