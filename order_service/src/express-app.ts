import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(orderRoutes);
app.use(cartRoutes);

app.use("/", (_req: Request, res: Response, _: NextFunction) => {
  res.status(200).json({ message: "I am healthy!" });
  return;
});

export default app;
