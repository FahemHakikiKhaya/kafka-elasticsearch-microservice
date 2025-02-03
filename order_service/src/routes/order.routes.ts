import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("success");
    return;
  }
);

router.get(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("success");
    return;
  }
);

router.patch(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("success");
    return;
  }
);

router.delete(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("success");
    return;
  }
);

export default router;
