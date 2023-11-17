import bcrypt from "bcrypt";
import { UserModel, TokenModel } from "../../models";
import { UnauthorizedError } from "../../errors";
import crypto from "crypto";
import config from "../../config";

export default {
  generateHash: async (password: string): Promise<string> => {
    const generateHash = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    };

    const hash = await generateHash(password);
    return hash;
  },

  compareHash: async (password: string, hash: string): Promise<boolean> => {
    const v = await bcrypt.compare(password, hash);
    return v;
  },

  requestPasswordReset: async (email: string) => {
    const user = await UserModel.findOne({ email });

    if (!user)
      throw new UnauthorizedError({
        logging: true,
        message: `${email} requested email reset without an account`,
      });
    let token = await TokenModel.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);

    await new TokenModel({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${config.websiteUrl}/password-reset/${resetToken}/${user._id}`;
    return link;
  },
};
