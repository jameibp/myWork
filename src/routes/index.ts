import { Application } from "express";
import { UserRouter } from "./routers";

export default async (app: Application) => {
  app.use("/user", UserRouter);
};
