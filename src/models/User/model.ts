import { Schema, model } from "mongoose";
import { IUser } from "../../types/global";

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "users",
  }
);

const User = model<IUser>("User", schema);

export default User;
