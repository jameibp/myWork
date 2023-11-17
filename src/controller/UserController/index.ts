import e, { Request, Response } from "express";
import { PostAuthRequest } from "../../types/global";
import {
  UserService,
  ConsultantService,
  PasswordService,
  MailService,
  JwtService,
} from "../../service";
import { ConflictError, ForbiddenError, UnauthorizedError } from "../../errors";
import { v4 as uuidv4 } from "uuid";

export default {
  requestResetPassword: async (req: Request, res: Response) => {
    const { email } = req.body;
    const resetUrl = await PasswordService.requestPasswordReset(email);
    await MailService.resetPasswordEmail(email, resetUrl);
    res.status(200).json({ error: false });
  },

  verifyResetPasswordLink: async (req: Request, res: Response) => {
    const { userId, token } = req.body;
    const verification = await UserService.verifyResetPasswordLink(
      userId,
      token
    );
    if (verification) {
      res.status(200).json({ error: false });
    } else {
      throw new Error("Something went wrong");
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    const { userId, token, password } = req.body;
    const resetPassword = await UserService.resetPassword(
      userId,
      token,
      password
    );
    if (resetPassword) {
      res.status(200).json({ error: false });
    } else {
      throw new Error("Something went wrong");
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    let allUsers = await UserService.getAllUsers({});
    res.status(200).json({ users: allUsers });
  },

  verifyEmail: async (req: Request, res: Response) => {
    const { uuid } = req.body;
    const checkUser = await UserService.getOneByUuid(uuid);

    if (!checkUser) {
      throw new ForbiddenError({
        logging: true,
      });
    }
    checkUser.isVerified = true;
    await checkUser.save();
    res.status(200).json({ error: false });
  },

  auth: async (req: PostAuthRequest, res: Response) => {
    const { userId } = req;
    const token = JwtService.createToken(userId as string);
    const consultantData = await ConsultantService.getConsultantData(
      userId as string
    );
    return res.status(200).json({ user: consultantData, token });
  },

  loginWithEmail: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.getOneByEmail(email);

    if (!user) {
      return res.status(200).json({ error: "404" });
    }

    if (!user.password || user.password === "") {
      return res.status(200).json({ error: "401" });
    }

    const validatePassword = await PasswordService.compareHash(
      password,
      user.password
    );

    if (validatePassword) {
      const token = JwtService.createToken(user.id as string);

      const consultantData = await ConsultantService.getConsultantData(
        user.id as string
      );
      return res.status(200).json({ user: consultantData, token });
    } else {
      return res.status(200).json({ error: "401" });
    }
  },

  login: async (req: PostAuthRequest, res: Response) => {
    const user = await UserService.getOneByEmail(req.fireabaseInfo.email);

    if (!user) {
      return res.status(200).json({ error: "404" });
    }

    const userId = user.id as string;
    const consultantData = await ConsultantService.getConsultantData(
      userId as string
    );
    const token = JwtService.createToken(userId as string);

    return res.status(200).json({ user: consultantData, token });
  },

  registerWithEmail: async (req: PostAuthRequest, res: Response) => {
    const { accountType, email, name, password } = req.body;

    const userCheck = await UserService.getOneByEmail(email);

    if (userCheck) {
      return res.status(200).json({ error: "409" });
    }

    const employeeEmailBool: boolean =
      email.includes("@inboundpartners.com") ||
      email.includes("@fronixsolutions.com");

    if (accountType === 1) {
      if (!employeeEmailBool) {
        return res.status(200).json({ error: "403", message: "Employee" });
      }
    }

    if (accountType === 0) {
      if (employeeEmailBool) {
        return res.status(200).json({ error: "403", message: "Consultant" });
      }
    }

    const hash = await PasswordService.generateHash(password);

    const uuid = uuidv4();

    const newUser = await UserService.create({
      createType: 0,
      name: name,
      email: email,
      userType: accountType,
      password: hash,
      uuid,
    });

    await MailService.verificationEmail(email, name, uuid);

    return res.status(201).json({ message: "User Created" });
  },

  register: async (req: PostAuthRequest, res: Response) => {
    const userCheck = await UserService.getOneByEmail(req.fireabaseInfo.email);

    if (userCheck) {
      return res.status(200).json({ error: "409" });
    }

    const employeeEmailBool: boolean =
      req.fireabaseInfo.email.includes("@inboundpartners.com") ||
      req.fireabaseInfo.email.includes("@fronixsolutions.com");

    if (req.body.accountType === 1) {
      if (!employeeEmailBool) {
        return res.status(200).json({ error: "403", message: "Employee" });
      }
    }

    if (req.body.accountType === 0) {
      if (employeeEmailBool) {
        return res.status(200).json({ error: "403", message: "Consultant" });
      }
    }

    const uuid = uuidv4();

    const newUser = await UserService.create({
      createType: 1,
      name: req.fireabaseInfo.name as string,
      uid: req.fireabaseInfo.uid as string,
      email: req.fireabaseInfo.email as string,
      userType: req.body.accountType as number,
      uuid,
    });

    return res.status(201).json({ message: "User Created" });
  },

  resendVerification: async (req: PostAuthRequest, res: Response) => {
    const user = await UserService.getById(req.userId as string);
    const { email, name, uuid } = user;
    await MailService.verificationEmail(email, name, uuid);
    res.status(200).json({ error: false });
  },
};
