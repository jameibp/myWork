import expressLoader from "./expess";
import mongoLoader from "./mongo";

import type { Express } from "express";

export default async ({ app }: { app: Express }) => {
  await mongoLoader();
  await expressLoader({ app });
  console.log("Express Loaded");
};
