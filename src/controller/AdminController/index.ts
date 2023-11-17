import { Response } from "express";
import { ConsultantService, UserService } from "../../service";
import { PostAuthRequest } from "../../types/global";
import S3Service from "../../service/s3";

export default {
  getDocumentByConsultantId: async (req: PostAuthRequest, res: Response) => {
    const { consultantId, documentName } = req.params;
    const key = `documents/${consultantId}-${documentName}`;
    const url = await S3Service.getReadUrl(key);
    res.status(200).json({ url });
  },
  getAllConsultants: async (req: PostAuthRequest, res: Response) => {
    const usersOfType0 = await UserService.getAllUsers({ userType: 0 });
    res.status(200).json({ data: usersOfType0 });
  },
  getConsultantData: async (req: PostAuthRequest, res: Response) => {
    const { id } = req.params;
    console.log(id);

    const consultantData = await ConsultantService.getConsultantData(
      id as string
    );
    res.status(200).json({ ...consultantData });
  },
};
