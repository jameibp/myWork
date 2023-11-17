import { FilterQuery, UpdateQuery } from "mongoose";
import { DAO } from "../dao/DAO";

export class ModelService {
  protected dao: DAO;

  constructor(dao: DAO) {
    this.dao = dao;
  }

  async create(record: any) {
    return await this.dao.create(record);
  }

  async deleteById(id: string) {
    return await this.dao.deleteById(id);
  }

  async getById(id: string) {
    return await this.dao.getById(id);
  }

  async getAll(filter: FilterQuery<any>) {
    return await this.dao.getAll(filter);
  }

  async getOne(filter: FilterQuery<any>) {
    return await this.dao.getOne(filter);
  }

  async update(filter: FilterQuery<any>, update: UpdateQuery<any>) {
    return await this.dao.update(filter, update);
  }
}
