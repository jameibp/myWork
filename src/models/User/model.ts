import { Schema, model } from "mongoose";
import { IUser } from "../../types/global";

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      unique: true,
      sparse: true,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    basicDetailsFilled: {
      type: Boolean,
      default: false,
    },
    h1bInfoFilled: {
      type: Boolean,
      default: false,
    },
    visaInfoFilled: {
      type: Boolean,
      default: false,
    },
    referencesFilled: {
      type: Boolean,
      default: false,
    },
    documentsSubmitted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

const User = model<IUser>("User", schema);

export default User;
