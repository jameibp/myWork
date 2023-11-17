import { NextFunction, Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { UnauthorizedError } from "../../errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

interface CustomPayload extends JwtPayload {
  userId?: string;
}

const verifyJwt = async (
  req: PostAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["access-token"];
    console.log(token);

    if (!token) {
      throw new UnauthorizedError({
        logging: true,
      });
    }
    const decoded = jwt.verify(
      token as string,
      config.jwtSecret as string
    ) as CustomPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJwt;
