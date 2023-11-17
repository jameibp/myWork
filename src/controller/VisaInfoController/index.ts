import { Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { VisaInfoService, UserService } from "../../service";
import { NotFoundError } from "../../errors";

const VisaInfoController = {
  async create(req: PostAuthRequest, res: Response) {
    const { visaStatus, visaExpiryDate, workAuthorizationExpiryDate } =
      req.body;
    const userId = req.userId;

    await VisaInfoService.create({
      visaStatus,
      visaExpiryDate,
      workAuthorizationExpiryDate,
      userId,
    });

    let userUpdate = await UserService.getById(userId as string);
    userUpdate.visaInfoFilled = true;
    await userUpdate.save();
    return res.status(201).json({ error: false });
  },
  async getByUserId(req: PostAuthRequest, res: Response) {
    const userId = req.userId;
    const record = await VisaInfoService.getOne({ userId });
    if (record) {
      return res.status(200).json({ error: false, data: record });
    } else {
      throw new NotFoundError({
        logging: true,
      });
    }
  },
};

export default VisaInfoController;
