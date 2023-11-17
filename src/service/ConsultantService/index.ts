import {
  BasicDetailsService,
  DocumentsService,
  H1bInfoService,
  ReferencesService,
  UserService,
  VisaInfoService,
} from "../../service";
import { ForbiddenError } from "../../errors";

export default {
  getConsultantData: async (userId: string) => {
    const user = await UserService.getById(userId as string);
    if (!user) {
      throw new ForbiddenError({ logging: true });
    }

    const {
      name,
      email,
      userType,
      basicDetailsFilled,
      documentsSubmitted,
      visaInfoFilled,
      h1bInfoFilled,
      isVerified,
      referencesFilled,
      uuid,
    } = user;

    let basicDetails = false,
      documents = false,
      visaInfo = false,
      references = false,
      h1bInfo = false;

    if (basicDetailsFilled) {
      basicDetails = await BasicDetailsService.getOne({
        userId,
      });
    }

    if (referencesFilled) {
      references = await ReferencesService.getOne({
        userId,
      });
    }

    if (documentsSubmitted) {
      documents = await DocumentsService.getOne({ userId });
    }

    if (visaInfoFilled) {
      visaInfo = await VisaInfoService.getOne({ userId });
    }

    if (h1bInfoFilled) {
      h1bInfo = await H1bInfoService.getOne({ userId });
    }

    if (!isVerified) {
      return {
        name,
        email,
        userType,
        isVerified,
        uuid,
      };
    }

    return {
      name,
      email,
      userType,
      isVerified,
      uuid,
      basicDetailsFilled,
      documentsSubmitted,
      visaInfoFilled,
      h1bInfoFilled,
      referencesFilled,
      basicDetails,
      documents,
      visaInfo,
      h1bInfo,
      references,
    };
  },
};
