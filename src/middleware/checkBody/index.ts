import { PostAuthRequest } from "../../types/global";
import { RequiredBodyError } from "../../errors";
import { NextFunction, Response } from "express";

function requiredFields(fields: string[]) {
  return function (req: PostAuthRequest, _res: Response, next: NextFunction) {
    try {
      const missingFields = [];
      const keys = Object.keys(req.body); // Included fields

      // Checks if every required field is in the body
      for (const field of fields)
        if (!keys.includes(field)) missingFields.push(field);

      // If there are missing fields then run next error middleware

      if (missingFields.length) {
        throw new RequiredBodyError({
          code: 400,
          message: `Request must include the fields: ${missingFields.join(
            ", "
          )}`,
          logging: true,
        });
        return;
      }

      // If no missing fields then run router code
      next();
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  };
}

export default requiredFields;
