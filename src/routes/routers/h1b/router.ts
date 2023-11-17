import { Router } from "express";
import { H1bC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, VerifyJwt } from "../../../middleware";

const router = Router();

router.post(
  "/",
  CheckBody([
    "currentEmployerName",
    "recruiterName",
    "recruiterEmail",
    "recruiterPhoneNumber",
  ]),
  VerifyJwt,
  TryCatch(H1bC.create)
);

router.get("/", VerifyJwt, TryCatch(H1bC.getByUserId));

export default router;
