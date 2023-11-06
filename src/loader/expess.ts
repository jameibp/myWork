import type { Application } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "../config";
import indexRouter from "../routes";

export default async ({ app }: { app: Application }) => {
  app.get("/status", (req, res) => res.sendStatus(200).send("Okay").end());
  app.head("/status", (req, res) => res.sendStatus(200).send("Okay").end());

  app.enable("trust proxy");

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan(config.logs.morgan));
  indexRouter(app);
};
