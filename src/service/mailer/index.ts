import nodemailer from "nodemailer";
import { RegisterEmail, ResetPassword } from "./html";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "james@inboundpartners.com",
    pass: "ftmd tuxk ovzy itni",
  },
});

const sendEmail = async (email: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"James M 👻" <james@inboundpartners.com>', // sender address
    to: `${email}, ${email}`, // list of receivers
    subject: subject, // Subject line
    html,
  });

  console.log("email sent: %s", info.messageId);
};
export default {
  verificationEmail: async (
    email: string,
    consultantName: string,
    uuid: string
  ) => {
    const html = RegisterEmail(consultantName, uuid);
    await sendEmail(email, "Email Verification", html);
  },

  resetPasswordEmail: async (email: string, resetUrl: string) => {
    const html = ResetPassword(resetUrl);
    await sendEmail(email, "Reset Password", html);
  },
};
