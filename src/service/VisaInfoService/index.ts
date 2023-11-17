// import { BasicDetailsDAO } from "../../dao";
// import { ModelService } from "../ModelService";

import { VisaInfoDAO } from "../../dao";
import { UpdateQuery, FilterQuery } from "mongoose";

// const BasicDetailsService = new ModelService(BasicDetailsDAO);

// export default BasicDetailsService;

export default {
  dao: VisaInfoDAO,

  async create(record: any) {
    return await this.dao.create(record);
  },

  async deleteById(id: string) {
    return await this.dao.deleteById(id);
  },

  async getById(id: string) {
    return await this.dao.getById(id);
  },

  async getAll(filter: FilterQuery<any>) {
    return await this.dao.getAll(filter);
  },

  async getOne(filter: FilterQuery<any>) {
    return await this.dao.getOneDocument(filter);
  },

  async update(filter: FilterQuery<any>, update: UpdateQuery<any>) {
    return await this.dao.update(filter, update);
  },
};
