import { Schema, Types, model } from "mongoose";
import { IReferences } from "../../types/global";

const referencesSchema = new Schema<IReferences>(
  {
    firstFullName: { type: String, required: true },
    firstTitle: { type: String, required: true },
    firstPhoneNumber: { type: String, required: true },
    firstEmailId: { type: String, required: true },
    firstLinkedInUrl: { type: String, required: true },
    firstClientName: { type: String, required: true },
    firstClientLocation: { type: String, required: true },
    secondFullName: { type: String, required: true },
    secondTitle: { type: String, required: true },
    secondPhoneNumber: { type: String, required: true },
    secondEmailId: { type: String, required: true },
    secondLinkedInUrl: { type: String, required: true },
    secondClientName: { type: String, required: true },
    secondClientLocation: { type: String, required: true },
    userId: Types.ObjectId,
  },
  {
    collection: "references",
  }
);
const References = model<IReferences>("References", referencesSchema);

export default References;
