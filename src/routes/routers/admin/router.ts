import { Router } from "express";
import { AC } from "../../../controller";
import { TryCatch } from "../../../service";
import { VerifyJwt } from "../../../middleware";

const router = Router();

router.get("/allConsultants", VerifyJwt, TryCatch(AC.getAllConsultants));
router.get("/consultant/:id", VerifyJwt, TryCatch(AC.getConsultantData));
router.get(
  "/:documentName/:consultantId",
  VerifyJwt,
  TryCatch(AC.getDocumentByConsultantId)
);

export default router;
