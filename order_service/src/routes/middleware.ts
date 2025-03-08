import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils/broker";
import { AuthorizeError } from "../utils";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      next(new AuthorizeError());
    }

    const userData = await ValidateUser(req.headers.authorization as string);
    req.user = userData;

    next();
  } catch (error) {
    next(error);
  }
};
