import { Response } from "express";
import { PostAuthRequest } from "../../types/global";
import { YesNoToBoolean } from "../../utils";
import { BasicDetailsService, UserService } from "../../service";
import { NotFoundError } from "../../errors";

const BasicDetailsController = {
  async create(req: PostAuthRequest, res: Response) {
    const {
      firstName,
      middleName,
      lastName,
      email,
      linkedInUrl,
      contactNumber,
      alternateContactNumber,
      currentLocation,
      currentClientLocation,
      bachelorsUniversity,
      mastersCourse,
      mastersUniversity,
      yearOfCompletion,
      dateOfBirth,
      landedInUsa,
      readyToRelocate,
      willingToComeToTheGuestHouse,
      ssnLast4Digits,
      areYouAUsCitizen,
    } = req.body;
    const userId = req.userId;
    const boolConvertedData = YesNoToBoolean({
      firstName,
      middleName,
      lastName,
      email,
      linkedInUrl,
      contactNumber,
      alternateContactNumber,
      currentLocation,
      currentClientLocation,
      bachelorsUniversity,
      mastersCourse,
      mastersUniversity,
      yearOfCompletion,
      dateOfBirth,
      landedInUsa,
      readyToRelocate,
      willingToComeToTheGuestHouse,
      ssnLast4Digits,
      areYouAUsCitizen,
    });

    await BasicDetailsService.create({
      ...boolConvertedData,
      userId,
    });

    let userUpdate = await UserService.getById(userId as string);
    userUpdate.basicDetailsFilled = true;
    await userUpdate.save();

    res.status(201).json({ error: false });
  },

  async getByUserId(req: PostAuthRequest, res: Response) {
    const userId = req.userId;
    const record = await BasicDetailsService.getOne({ userId });
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
