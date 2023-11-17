import { Application } from "express";
import {
  AdminRouter,
  BDRouter,
  DocumentsRouter,
  H1bRouter,
  UserRouter,
  VisaRouter,
  ReferencesRouter,
} from "./routers";

export default async (app: Application) => {
  app.use("/user", UserRouter);
  app.use("/basicDetails", BDRouter);
  app.use("/h1bInfo", H1bRouter);
  app.use("/visaInfo", VisaRouter);
  app.use("/documents", DocumentsRouter);
  app.use("/admin", AdminRouter);
  app.use("/references", ReferencesRouter);
};
