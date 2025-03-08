import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";

export const HandleErrorWithLogger: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      data = error.message;
    }
  });

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error);

    res.status(status).json(data);
    return;
  }
};

export const HandleUnCaughtException = async (error: Error) => {
  logger.error(error);
  process.exit(1);
};
