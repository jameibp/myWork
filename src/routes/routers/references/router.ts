import { Router } from "express";
import { RC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, VerifyJwt } from "../../../middleware";

const router = Router();

router.post(
  "/",
  CheckBody([
    "firstFullName",
    "firstTitle",
    "firstPhoneNumber",
    "firstEmailId",
    "firstLinkedInUrl",
    "firstClientName",
    "firstClientLocation",
    "secondFullName",
    "secondTitle",
    "secondPhoneNumber",
    "secondEmailId",
    "secondLinkedInUrl",
    "secondClientName",
    "secondClientLocation",
  ]),
  VerifyJwt,
  TryCatch(RC.create)
);

router.get("/", VerifyJwt, TryCatch(RC.getByUserId));

export default router;
