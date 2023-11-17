// export type CustomErrorContent = {
//   message: string;
//   context?: { [key: string]: any };
// };

import type { FilterQuery, Model, UpdateQuery } from "mongoose";

type TDaoModel = Model<any>;

export class DAO {
  protected model: TDaoModel;

  constructor(model: TDaoModel) {
    this.model = model;
  }

  returnNew(userId: string) {
    let record = new this.model({ userId });
    return record;
  }

  async create(user: any) {
    return await this.model.create(user);
  }

  async deleteById(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async getById(id: string) {
    return await this.model.findById(id);
  }

  async getAll(filter: FilterQuery<any>) {
    return await this.model.find(filter);
  }

  async getOne(filter: FilterQuery<any>) {
    return await this.model.findOne(filter);
  }

  async getOneByUserId(userId: string) {
    return await this.model.findOne({ userId });
  }

  async getOneDocument(filter: FilterQuery<any>) {
    return await this.model.findOne(filter, {
      userId: false,
      _id: false,
      __v: false,
    });
  }

  async update(filter: FilterQuery<any>, update: UpdateQuery<any>) {
    return await this.model.findOneAndUpdate(filter, update);
  }

  async updateById(id: string, update: UpdateQuery<any>) {
    return await this.model.findByIdAndUpdate(id, update);
  }
}
