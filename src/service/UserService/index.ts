import { IUser, TRegisterType } from "../../types/global";
import { UserDao } from "../../dao";
import bcrypt from "bcrypt";
import { FilterQuery, UpdateQuery } from "mongoose";
import { TokenModel, UserModel } from "../../models";
import { UnauthorizedError } from "../../errors";

export default {
  getAllUsers: async (filter: FilterQuery<IUser>) =>
    await UserDao.getAll(filter),

  getUserByUid: async (uid: string): Promise<IUser> => {
    return await UserDao.getOne({ uid });
  },
  getOneByEmail: async (email: string): Promise<IUser> => {
    return await UserDao.getOne({ email });
  },

  getOneByUuid: async (uuid: string): Promise<IUser> => {
    return await UserDao.getOne({ uuid });
  },

  getById: async (id: string): Promise<IUser> => {
    return await UserDao.getById(id);
  },

  async update(filter: FilterQuery<any>, update: UpdateQuery<any>) {
    return await UserDao.update(filter, update);
  },

  async updateById(id: string, update: UpdateQuery<any>) {
    return await UserDao.updateById(id, update);
  },

  async verifyResetPasswordLink(userId: string, token: string) {
    let passwordResetToken = await TokenModel.findOne({ userId });
    if (!passwordResetToken) {
      throw new UnauthorizedError();
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new UnauthorizedError();
    }
    return true;
  },

  async resetPassword(userId: string, token: string, password: string) {
    let passwordResetToken = await TokenModel.findOne({ userId });
    if (!passwordResetToken) {
      throw new UnauthorizedError();
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, Number(10));
    await UserModel.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await UserModel.findById({ _id: userId });
    await passwordResetToken.deleteOne();
    return true;
  },

  create: async ({
    createType,
    name,
    uid,
    email,
    userType,
    password,
    uuid,
  }: {
    createType: TRegisterType;
    name: string;
    uid?: string;
    email: string;
    userType: number;
    password?: string;
    uuid: string;
  }) => {
    if (createType === 0) {
      return await UserDao.create({
        name,
        email,
        userType,
        isVerified: false,
        uuid,
        password,
      });
    }

    return await UserDao.create({
      name,
      email,
      uid,
      userType,
      isVerified: true,
      uuid,
    });
  },
};
