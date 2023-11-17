import { Schema, Types, model } from "mongoose";
import { IVisaInfo } from "../../types/global";

const visaStatusOptions = [
  "CPT Part Time",
  "CPT Full Time",
  "OPT",
  "OPT-STEM",
  "H-1B",
  "Green Card",
  "TN",
  "H-4 EAD",
];

const visaSchema = new Schema<IVisaInfo>({
  visaStatus: {
    type: String,
    enum: visaStatusOptions,
    required: true,
  },
  visaExpiryDate: {
    type: String,
    required: true,
  },
  workAuthorizationExpiryDate: {
    type: String,
    required: true,
  },
  userId: Types.ObjectId,
});

const VisaInfo = model<IVisaInfo>("VisaInfo", visaSchema);

export default VisaInfo;
