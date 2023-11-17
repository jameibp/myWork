import { Router } from "express";
import { VC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, VerifyJwt } from "../../../middleware";

const router = Router();

router.post(
  "/",
  CheckBody(["visaStatus", "visaExpiryDate", "workAuthorizationExpiryDate"]),
  VerifyJwt,
  TryCatch(VC.create)
);

router.get("/", VerifyJwt, TryCatch(VC.getByUserId));

export default router;
