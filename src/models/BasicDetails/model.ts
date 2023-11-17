import { Schema, Types, model } from "mongoose";
import { IBasicDetails } from "../../types/global";

const basicDetailsSchema = new Schema<IBasicDetails>(
  {
    dateOfBirth: String,
    landedInUsa: String,
    yearOfCompletion: String,
    alternateContactNumber: String,
    bachelorsUniversity: String,
    contactNumber: String,
    currentClientLocation: String,
    currentLocation: String,
    email: String,
    firstName: String,
    lastName: String,
    linkedInUrl: String,
    mastersCourse: String,
    mastersUniversity: String,
    middleName: String,
    ssnLast4Digits: String,
    areYouAUsCitizen: Boolean,
    readyToRelocate: Boolean,
    willingToComeToTheGuestHouse: Boolean,
    userId: Types.ObjectId,
  },
  {
    collection: "basicDetails",
  }
);
const BasicDetails = model<IBasicDetails>("BasicDetails", basicDetailsSchema);

export default BasicDetails;
