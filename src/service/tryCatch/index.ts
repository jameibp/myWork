import { NextFunction, Response } from "express";
import { PostAuthRequest } from "../../types/global";

export default (controllerFunction: Function) =>
  async (req: PostAuthRequest, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res);
    } catch (error: any) {
      console.log(error.message);
      console.log(controllerFunction);
      next(error);
    }
  };
