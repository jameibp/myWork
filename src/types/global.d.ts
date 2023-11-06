import { Document, FilterQuery, UpdateQuery } from "mongoose";

declare enum EUserType {
  Applicant = 0,
  Employee = 1,
}

declare interface IUser extends Document {
  name: string;
  email: string;
}

interface IUserDAO {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByIdAndDelete(id: string): Promise<IUser[] | null>;
  findByIdAndUpdate(
    id: string,
    update: UpdateQuery<IUser>
  ): Promise<IUser[] | null>;
  findOne(filter: FilterQuery<IUser>): Promise<IUser | null>;
  findMany(filter: FilterQuery<IUser>): Promise<IUser[] | null>;
  findOneAndUpdate(
    filter: FilterQuery<IUser>,
    update: UpdateQuery<IUser>
  ): Promise<IUser[] | null>;
  findOneAndDelete(filter: FilterQuery<IUser>): Promise<IUser[] | null>;
}
