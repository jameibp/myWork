import { Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { H1bInfoService, UserService } from "../../service";
import { NotFoundError } from "../../errors";

const H1bController = {
  async create(req: PostAuthRequest, res: Response) {
    const {
      currentEmployerName,
      recruiterName,
      recruiterEmail,
      recruiterPhoneNumber,
    } = req.body;
    const userId = req.userId;

    await H1bInfoService.create({
      currentEmployerName,
      recruiterName,
      recruiterEmail,
      recruiterPhoneNumber,
      userId,
    });

    let userUpdate = await UserService.getById(userId as string);
    userUpdate.h1bInfoFilled = true;
    await userUpdate.save();

    return res.status(201).json({ error: false });
  },

  async getByUserId(req: PostAuthRequest, res: Response) {
    const userId = req.userId;
    const record = await H1bInfoService.getOne({ userId });
    if (record) {
      return res.status(200).json({ error: false, data: record });
    } else {
      throw new NotFoundError({
        logging: true,
      });
    }
  },
};

export default H1bController;
