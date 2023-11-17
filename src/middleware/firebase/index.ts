import { NextFunction, Response } from "express";
import { FirebaseAdmin, UserService } from "../../service";
import { PostAuthRequest } from "../../types/global";
import { BadRequestError, UnauthorizedError } from "../../errors";

export default {
  firebaseMiddleware: async (
    req: PostAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const idToken = req.header("Authorization");
      if (!idToken) {
        throw new BadRequestError({
          code: 400,
          message: "Firebase Token is Required!",
          logging: true,
        });
      }
      const fbRes = await FirebaseAdmin.auth().verifyIdToken(idToken as string);
      req.fireabaseInfo = fbRes;
      next();
    } catch (error) {
      next(error);
    }
  },

  checkIfUserExist: async (
    req: PostAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userCheck = await UserService.getOneByEmail(
        req.fireabaseInfo.email
      );
      if (!userCheck) {
        throw new UnauthorizedError({
          logging: true,
        });
      }
      req.user = userCheck;
      next();
    } catch (error) {
      next(error);
    }
  },
};
