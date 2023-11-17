import { Router } from "express";
import { UC } from "../../../controller";
import { TryCatch } from "../../../service";
import { CheckBody, FirebaseMiddleware, VerifyJwt } from "../../../middleware/";

const router = Router();

router.get("/", TryCatch(UC.getAllUsers));

router.post(
  "/register",
  FirebaseMiddleware.firebaseMiddleware,
  CheckBody(["accountType"]),
  TryCatch(UC.register)
);

router.post(
  "/register-with-email",
  CheckBody(["accountType", "email", "name", "password"]),
  TryCatch(UC.registerWithEmail)
);

router.post(
  "/login-with-email",
  CheckBody(["email", "password"]),
  TryCatch(UC.loginWithEmail)
);
router.post(
  "/verify-reset-password-link",
  CheckBody(["userId", "token"]),
  TryCatch(UC.verifyResetPasswordLink)
);

router.post(
  "/request-reset-password",
  CheckBody(["email"]),
  TryCatch(UC.requestResetPassword)
);

router.post(
  "/reset-password",
  CheckBody(["password", "token", "userId"]),
  TryCatch(UC.resetPassword)
);

router.post("/verify-email", CheckBody(["uuid"]), TryCatch(UC.verifyEmail));

router.get("/auth", VerifyJwt, TryCatch(UC.auth));
router.get("/resend-verification", VerifyJwt, TryCatch(UC.resendVerification));

router.get("/login", FirebaseMiddleware.firebaseMiddleware, TryCatch(UC.login));

export default router;
