import { Schema, Types, model } from "mongoose";
import { IH1BInfo } from "../../types/global";

const h1bInfoSchema = new Schema<IH1BInfo>({
  currentEmployerName: String,
  recruiterName: String,
  recruiterEmail: String,
  recruiterPhoneNumber: String,
  userId: Types.ObjectId,
});

const H1bInfo = model<IH1BInfo>("H1bInfo", h1bInfoSchema);

export default H1bInfo;
