import { Request, Response } from "express";
import { UserDao } from "../../dao";

export default {
  getAllUsers: async (req: Request, res: Response) => {
    let allUsers = await UserDao.getAllUsers();
    res.status(200).json({ users: allUsers });
  },
};
