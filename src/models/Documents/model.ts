import { Schema, Types, model } from "mongoose";
import { IDocument } from "../../types/global";

const documentSchema = new Schema<IDocument>({
  updatedResume: Boolean,
  dlCopyStateId: Boolean,
  passportCopy: Boolean,
  optCard: Boolean,
  i797Copy: Boolean,
  visaCopy: Boolean,
  gcCopy: Boolean,
  eadCopy: Boolean,
  i20: Boolean,
  userId: Types.ObjectId,
});

const Documents = model<IDocument>("Documents", documentSchema);

export default Documents;
