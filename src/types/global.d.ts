import { Document, FilterQuery, UpdateQuery, Types } from "mongoose";
import { DecodedIdToken } from "firebase-admin";
import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

declare enum EUserType {
  Applicant = 0,
  Employee = 1,
}

declare interface IUser extends Document {
  name: string;
  uid?: string;
  password?: string;
  userType: number;
  email: string;
  basicDetailsFilled: boolean;
  h1bInfoFilled: boolean;
  visaInfoFilled: boolean;
  referencesFilled: boolean;
  documentsSubmitted: boolean;
  isVerified: boolean;
  uuid: string;
}

declare interface IBasicDetails extends Document {
  dateOfBirth: string;
  landedInUsa: string;
  yearOfCompletion: string;
  alternateContactNumber: string;
  bachelorsUniversity: string;
  contactNumber: string;
  currentClientLocation: string;
  currentLocation: string;
  email: string;
  firstName: string;
  lastName: string;
  linkedInUrl: string;
  mastersCourse: string;
  mastersUniversity: string;
  middleName: string;
  ssnLast4Digits: string;
  areYouAUsCitizen: boolean;
  readyToRelocate: boolean;
  willingToComeToTheGuestHouse: boolean;
  userId: Types.ObjectId;
}

declare interface IH1BInfo extends Document {
  currentEmployerName: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterPhoneNumber: string;
  userId: Types.ObjectId;
}

declare interface IDocument extends Document {
  updatedResume: boolean;
  dlCopyStateId: boolean;
  passportCopy: boolean;
  optCard: boolean;
  i797Copy: boolean;
  visaCopy: boolean;
  gcCopy: boolean;
  eadCopy: boolean;
  i20: boolean;
  userId: Types.ObjectId;
}

declare type VisaStatus =
  | "CPT Part Time"
  | "CPT Full Time"
  | "OPT"
  | "OPT-STEM"
  | "H-1B"
  | "Green Card"
  | "TN"
  | "H-4 EAD";

declare interface IVisaInfo extends Document {
  visaStatus: VisaStatus;
  visaExpiryDate: string;
  workAuthorizationExpiryDate: string;
  userId: Types.ObjectId;
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

declare type TFirebaseInfo = {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      "google.com": string[];
      email: string[];
    };
    sign_in_provider: string;
  };
  uid: string;
};

declare interface PostAuthRequest extends Request {
  fireabaseInfo?: any | TFirebaseInfo;
  userId?: string;
  user?: IUser;
  userId: string | JwtPayload;
}

declare enum TRegisterType {
  WithEmail = 0,
  Firebase = 1,
}

declare interface IToken extends Document {
  userId: Types.ObjectId;
  createdAt: Date;
  token: string;
}

declare interface IReferences extends Document {
  firstFullName: string;
  firstTitle: string;
  firstPhoneNumber: string;
  firstEmailId: string;
  firstLinkedInUrl: string;
  firstClientName: string;
  firstClientLocation: string;
  secondFullName: string;
  secondTitle: string;
  secondPhoneNumber: string;
  secondEmailId: string;
  secondLinkedInUrl: string;
  secondClientName: string;
  secondClientLocation: string;
  userId: Types.ObjectId;
}
