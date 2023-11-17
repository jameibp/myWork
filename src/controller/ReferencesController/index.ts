import { Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { YesNoToBoolean } from "../../utils";
import { ReferencesService, UserService } from "../../service";
import { NotFoundError } from "../../errors";

const BasicDetailsController = {
  async create(req: PostAuthRequest, res: Response) {
    const {
      firstFullName,
      firstTitle,
      firstPhoneNumber,
      firstEmailId,
      firstLinkedInUrl,
      firstClientName,
      firstClientLocation,
      secondFullName,
      secondTitle,
      secondPhoneNumber,
      secondEmailId,
      secondLinkedInUrl,
      secondClientName,
      secondClientLocation,
    } = req.body;
    const userId = req.userId;

    await ReferencesService.create({
      firstFullName,
      firstTitle,
      firstPhoneNumber,
      firstEmailId,
      firstLinkedInUrl,
      firstClientName,
      firstClientLocation,
      secondFullName,
      secondTitle,
      secondPhoneNumber,
      secondEmailId,
      secondLinkedInUrl,
      secondClientName,
      secondClientLocation,
      userId,
    });

    let userUpdate = await UserService.getById(userId as string);
    userUpdate.referencesFilled = true;
    await userUpdate.save();

    res.status(201).json({ error: false });
  },

  async getByUserId(req: PostAuthRequest, res: Response) {
    const userId = req.userId;
    const record = await ReferencesService.getOne({ userId });
    if (record) {
      return res.status(200).json({ error: false, data: record });
    } else {
      throw new NotFoundError({
        logging: true,
      });
    }
  },
};

export default BasicDetailsController;
