import { Schema, Types, model } from "mongoose";
import { IToken } from "../../types/global";

const tokenSchema = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // this is the expiry time in seconds
    },
  },
  {
    collection: "tokens",
  }
);
const Tokens = model<IToken>("Tokens", tokenSchema);

export default Tokens;
