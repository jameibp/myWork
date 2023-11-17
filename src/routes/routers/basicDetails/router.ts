import { Router } from "express";
import { BDC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, VerifyJwt } from "../../../middleware";

const router = Router();

router.post(
  "/",
  CheckBody([
    "firstName",
    "middleName",
    "lastName",
    "email",
    "linkedInUrl",
    "contactNumber",
    "alternateContactNumber",
    "currentLocation",
    "currentClientLocation",
    "bachelorsUniversity",
    "mastersCourse",
    "mastersUniversity",
    "yearOfCompletion",
    "dateOfBirth",
    "landedInUsa",
    "readyToRelocate",
    "willingToComeToTheGuestHouse",
    "ssnLast4Digits",
    "areYouAUsCitizen",
  ]),
  VerifyJwt,
  TryCatch(BDC.create)
);

router.get("/", VerifyJwt, TryCatch(BDC.getByUserId));

export default router;
