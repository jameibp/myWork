export default (resetUrl: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Email</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #f2f2f2;
    }

    .container {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #007bff;
      color: #fff;
      padding: 20px;
      text-align: center;
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

    .reset-button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>

    <p>Hi there,</p>

    <p>We received a request to reset your password. Please click on the following link to complete the process:</p>

    <p>Please logout from your device before you click on the link.</p>
    
    <a href="${resetUrl}" class="reset-button">Reset Password</a>

    <p>This link will expire in 1 hour.</p>


    <p>If you did not request a password reset, please ignore this email.</p>

    <p>Thank you,</p>
    <p>The Team</p>

    <div class="footer">
      <p>&copy; 2023 Inbound Partners</p>
    </div>
  </div>
</body>
</html>
`;
};
