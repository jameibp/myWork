import jwt from "jsonwebtoken";
import config from "../../config";

const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, config.jwtSecret as string, {
    expiresIn: 90000,
  });
  return token;
};

export default {
  createToken,
};
