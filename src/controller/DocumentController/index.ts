import { Response } from "express";
import { PostAuthRequest } from "../../types/global";
import S3Service from "../../service/s3";
import { DocumentsService, UserService } from "../../service";
import { Log } from "../../utils";

const DocumentController = {
  getS3PutUrl: async (req: PostAuthRequest, res: Response) => {
    const { documentName, fileType } = req.body;
    const key = `documents/${req.userId}-${documentName}`;
    const url = await S3Service.getPutUrl(key, fileType);
    return res.status(200).json({ error: false, url: url, key });
  },

  getS3ReadUrl: async (req: PostAuthRequest, res: Response) => {
    const { documentName } = req.body;
    const { userId } = req;
    const key = `documents/${userId}-${documentName}`;
    const url = await S3Service.getReadUrl(key);
    res.status(200).json({ url });
  },

  postDocument: async (req: PostAuthRequest, res: Response) => {
    const { userId } = req;
    const { documentName } = req.body;
    console.log("26");
    const userModel = await UserService.getById(userId as string);
    userModel.documentsSubmitted = true;
    const s = await userModel.save();
    const user = await DocumentsService.getOneByUserId(userId as string);
    const saveDocuments = async () => {
      user[documentName] = true;
      await user.save();
      return res.json({ error: false });
    };
    if (user) {
      saveDocuments();
    } else {
      const newDocs = DocumentsService.returnNew(userId as string);
      newDocs[documentName] = true;
      await newDocs.save();
      res.json({ error: false });
    }
  },
};

export default DocumentController;
