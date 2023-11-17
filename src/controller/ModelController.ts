import { NotFoundError } from "../errors";
import { ModelService } from "../service/ModelService";
import { PostAuthRequest } from "../types/global";
import { Response } from "express";

export class ModelController {
  protected service: ModelService;

  constructor(service: ModelService) {
    this.service = service;
  }

  async getByUserId(req: PostAuthRequest, res: Response) {
    const userId = req.userId;
    const record = await this.service.getOne({ userId });
    if (record) {
      return res.status(200).json({ error: false, data: record });
    } else {
      throw new NotFoundError({
        logging: true,
      });
    }
  }
}
