import { Router } from "express";
import { DC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, VerifyJwt } from "../../../middleware";

const router = Router();

router.post(
  "/getS3UploadUrl",
  VerifyJwt,
  CheckBody(["documentName", "fileType"]),
  TryCatch(DC.getS3PutUrl)
);

router.post(
  "/",
  VerifyJwt,
  CheckBody(["documentName"]),
  TryCatch(DC.getS3ReadUrl)
);

router.post(
  "/post",
  VerifyJwt,
  CheckBody(["documentName"]),
  TryCatch(DC.postDocument)
);

export default router;
