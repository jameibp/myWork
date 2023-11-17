import config from "../../../config";

export default (consultantName: string, uuid: string) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Thank you for registering!</title>
    <style>
      body {
        font-family: sans-serif;
        background-color: #f2f2f2;
      }

      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
      }

      p {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
      }

      a {
        color: #007bff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .container {
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .header h1 {
        font-size: 32px;
      }

      .footer {
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
      }

      .footer p {
        font-size: 12px;
        color: #999;
      }

      .verify-button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Thank you for registering ${consultantName}!</h1>
      </div>

      <p>We are excited to have you join our community.</p>

      <p>Please click on the following link to verify your email address:</p>
      <a href="${config.websiteUrl}/verify-account/${uuid}" class="verify-button">Verify Email</a>

      <p>
        Once you have verified your email address, you will be able to log in to
        your account and start using our services.
      </p>

      <p>Thank you again for registering!</p>

      <p>Sincerely,</p>
      <p>The Team</p>

      <div class="footer">
        <p>&copy; 2023 Inbound Partners</p>
      </div>
    </div>
  </body>
</html>
`;
};
