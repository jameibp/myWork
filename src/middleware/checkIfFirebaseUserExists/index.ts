import { NextFunction, Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { UserService } from "../../service";
import { UnauthorizedError } from "../../errors";

const checkIfFirebaseUserExists = async (
  req: PostAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fireabaseInfo } = req;
    const user = await UserService.getOneByEmail(fireabaseInfo.email);
    if (!user) {
      throw new UnauthorizedError({
        logging: true,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkIfFirebaseUserExists;
