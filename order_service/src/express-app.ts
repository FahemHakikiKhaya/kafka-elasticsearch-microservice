import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();

  await InitializeBroker();

  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  app.use(orderRoutes);
  app.use(cartRoutes);

  app.use("/", (_req: Request, res: Response, _: NextFunction) => {
    res.status(200).json({ message: "I am healthy!" });
    return;
  });

  app.use(HandleErrorWithLogger);

  return app;
};
