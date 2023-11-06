import { Router } from "express";
// import userController from "../../../controller/user.controller";
import { UC } from "../../../controller";

const router = Router();

router.get("/", UC.getAllUsers);

export default router;
